"use server";

/**
 * @description Create a new guide experience
 * @category Experiences
 * @inputModel {
 *   // Basic Information
 *   "title": "Boat Tour in Cancun",
 *   "description": "An amazing boat tour through the crystal clear waters of Cancun",
 *   "duration_minutes": 180,
 *   "min_participants": 1,
 *   "max_participants": 10,
 *   "max_adults": 6,
 *   "max_teens": 2,
 *   "max_children": 2,
 *
 *   // Itinerary
 *   "itinerary": [
 *     {"order": 1, "title": "Meeting point", "description": "Meet at the main pier", "duration_minutes": 15},
 *     {"order": 2, "title": "Boat tour", "description": "Navigation through crystal clear waters", "duration_minutes": 120},
 *     {"order": 3, "title": "Return", "description": "Return to the main pier", "duration_minutes": 45}
 *   ],
 *
 *   // Prices
 *   "price_tiers": [
 *     {"min_people": 1, "max_people": 2, "adult_price": 100, "teen_price": 90, "child_price": 80},
 *     {"min_people": 3, "max_people": 6, "adult_price": 80, "teen_price": 70, "child_price": 60},
 *     {"min_people": 7, "max_people": 10, "adult_price": 60, "teen_price": 50, "child_price": 0}
 *   ],
 *
 *   // Media (Cloudinary URLs)
 *   "cover_image": "https://res.cloudinary.com/example/image/upload/v1234567890/cover.jpg",
 *   "gallery_images": ["https://res.cloudinary.com/example/image/upload/v1234567890/gallery1.jpg"],
 *
 *   // Working Hours
 *   "working_hours": [
 *     {"day_of_week": 0, "start_time": "09:00:00", "end_time": "17:00:00"}, // Sunday
 *     {"day_of_week": 1, "start_time": "09:00:00", "end_time": "17:00:00"}, // Monday
 *     {"day_of_week": 5, "start_time": "10:00:00", "end_time": "18:00:00"}  // Friday
 *   ],
 *
 *   // Tags (IDs only)
 *   "tag_ids": [
 *     "123e4567-e89b-12d3-a456-426614174000", // Cancun (city)
 *     "123e4567-e89b-12d3-a456-426614174001", // Boat tour (activity)
 *     "123e4567-e89b-12d3-a456-426614174002", // Water and snacks (service_included)
 *     "123e4567-e89b-12d3-a456-426614174003", // Transportation (service_not_included)
 *     "123e4567-e89b-12d3-a456-426614174004"  // Swimming ability (special_requirements)
 *   ],
 *
 *   // Cancellation Policy (ID)
 *   "cancellation_policy_id": "123e4567-e89b-12d3-a456-426614174005"
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Validation schema for itinerary items
const itineraryItemSchema = z.object({
  order: z.number().int().min(1),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  duration_minutes: z.number().int().min(1),
});

// Validation schema for price tiers
const priceTierSchema = z
  .object({
    min_people: z.number().int().min(1),
    max_people: z.number().int().min(1),
    adult_price: z.number().min(0),
    teen_price: z.number().min(0),
    child_price: z.number().min(0),
  })
  .refine((data) => data.min_people <= data.max_people, {
    message: "Minimum people must be less than or equal to maximum people",
    path: ["min_people"],
  });

// Validation schema for working hours
const workingHourSchema = z
  .object({
    day_of_week: z.number().int().min(0).max(6), // 0 = Sunday, 6 = Saturday
    start_time: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
        "Invalid time format (HH:MM:SS)"
      ),
    end_time: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
        "Invalid time format (HH:MM:SS)"
      ),
  })
  .refine(
    (data) => {
      // Check if start time is before end time
      const start = new Date(`1970-01-01T${data.start_time}`);
      const end = new Date(`1970-01-01T${data.end_time}`);
      return start < end;
    },
    {
      message: "Start time must be before end time",
      path: ["start_time"],
    }
  );

// Main schema
const schema = z
  .object({
    // Basic Information
    title: z.string().min(3).max(255),
    description: z.string().min(10),
    duration_minutes: z.number().int().min(30),
    min_participants: z.number().int().min(1),
    max_participants: z.number().int().min(1),
    max_adults: z.number().int().min(0),
    max_teens: z.number().int().min(0),
    max_children: z.number().int().min(0),

    // Itinerary
    itinerary: z.array(itineraryItemSchema).min(1).max(20),

    // Prices
    price_tiers: z.array(priceTierSchema).min(1),

    // Media
    cover_image: z.string().url(),
    gallery_images: z.array(z.string().url()).min(1),

    // Working Hours
    working_hours: z.array(workingHourSchema).min(1),

    // Tags
    tag_ids: z.array(z.string().uuid()).min(1),

    // Cancellation Policy
    cancellation_policy_id: z.string().uuid(),
  })
  .refine((data) => data.min_participants <= data.max_participants, {
    message:
      "Minimum participants must be less than or equal to maximum participants",
    path: ["min_participants"],
  })
  .refine(
    (data) => {
      const totalMax = data.max_adults + data.max_teens + data.max_children;
      return (
        totalMax >= data.min_participants && totalMax <= data.max_participants
      );
    },
    {
      message:
        "The sum of maximum adults, teens, and children must be between minimum and maximum participants",
      path: ["max_adults"],
    }
  )
  .refine(
    (data) => {
      // Check if price tiers cover the entire range of participants
      const sortedTiers = [...data.price_tiers].sort(
        (a, b) => a.min_people - b.min_people
      );

      // Check if the first tier starts with the minimum participants
      if (sortedTiers[0].min_people > data.min_participants) {
        return false;
      }

      // Check if the last tier ends with the maximum participants
      if (
        sortedTiers[sortedTiers.length - 1].max_people < data.max_participants
      ) {
        return false;
      }

      // Check if there are no gaps between tiers
      for (let i = 0; i < sortedTiers.length - 1; i++) {
        if (sortedTiers[i].max_people + 1 !== sortedTiers[i + 1].min_people) {
          return false;
        }
      }

      return true;
    },
    {
      message:
        "Price tiers must cover the entire range of participants without gaps",
      path: ["price_tiers"],
    }
  );

export async function createExperience(prevState, formData) {
  try {
    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Process arrays and JSON objects
    const processedData = { ...rawData };

    // Process fields that may be arrays or JSON objects
    const jsonFields = [
      "itinerary",
      "price_tiers",
      "gallery_images",
      "working_hours",
      "tag_ids",
    ];

    jsonFields.forEach((field) => {
      if (rawData[field]) {
        try {
          if (typeof rawData[field] === "string") {
            processedData[field] = JSON.parse(rawData[field]);
          }
        } catch (e) {
          console.error(`Error processing field ${field}:`, e);
        }
      }
    });

    // Process numeric fields
    const numericFields = [
      "duration_minutes",
      "min_participants",
      "max_participants",
      "max_adults",
      "max_teens",
      "max_children",
    ];

    numericFields.forEach((field) => {
      if (rawData[field]) {
        processedData[field] = Number(rawData[field]);
      }
    });

    // Debug log
    console.log("Processed data:", processedData);

    // Validate processed data
    const validation = schema.safeParse(processedData);

    // If validation error, return immediately with errors
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Validated data
    const data = validation.data;

    // Get authenticated user and Supabase client
    const { user, profile, supabase } = await requireAuth();

    // Check if user is a guide
    if (profile.user_type !== "guide") {
      return {
        success: false,
        errors: {
          _form: "Only guides can create experiences",
        },
      };
    }

    try {
      // Call the stored procedure to create the experience
      const { data: result, error } = await supabase.rpc(
        "create_guide_experience",
        {
          p_guide_id: user.id,
          p_title: data.title,
          p_description: data.description,
          p_duration_minutes: data.duration_minutes,
          p_min_participants: data.min_participants,
          p_max_participants: data.max_participants,
          p_max_adults: data.max_adults,
          p_max_teens: data.max_teens,
          p_max_children: data.max_children,
          p_itinerary: data.itinerary,
          p_price_tiers: data.price_tiers,
          p_cover_image: data.cover_image,
          p_gallery_images: data.gallery_images,
          p_working_hours: data.working_hours,
          p_tag_ids: data.tag_ids,
          p_cancellation_policy_id: data.cancellation_policy_id,
        }
      );

      if (error) {
        throw new Error("Error creating experience: " + error.message);
      }

      // The result is the ID of the created experience
      const experienceId = result;

      // Revalidate paths to update UI data
      revalidatePath("/guide/experiences");
      revalidatePath("/experiences");

      return {
        success: true,
        message: "Experience created successfully and sent for review!",
        data: {
          id: experienceId,
        },
      };
    } catch (error) {
      console.error("createExperience error:", error);
      return {
        success: false,
        errors: {
          _form:
            error.message || "Error creating experience. Please try again.",
        },
      };
    }
  } catch (error) {
    console.error("createExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Error creating experience. Please try again.",
      },
    };
  }
}
