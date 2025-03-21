'use server'

/**
 * @description List experiences with optional filters
 * @category Experiences
 * @inputModel {
 *   "search": "boat tour",
 *   "city": "Cancun",
 *   "activity": "Snorkeling",
 *   "min_price": 50,
 *   "max_price": 200,
 *   "participants": 4,
 *   "sort_by": "price_asc",
 *   "page": 1,
 *   "limit": 10
 * }
 */

import { z } from "zod";
import { requireAuth } from "@/lib/withAuth";

// Schema for validation
const schema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  activity: z.string().optional(),
  min_price: z.preprocess(
    (val) => (val === "" || val === undefined) ? undefined : Number(val),
    z.number().min(0).optional()
  ),
  max_price: z.preprocess(
    (val) => (val === "" || val === undefined) ? undefined : Number(val),
    z.number().min(0).optional()
  ),
  participants: z.preprocess(
    (val) => (val === "" || val === undefined) ? undefined : Number(val),
    z.number().int().positive().optional()
  ),
  sort_by: z.enum(['price_asc', 'price_desc', 'newest', 'oldest']).default('newest'),
  page: z.preprocess(
    (val) => (val === "" || val === undefined) ? 1 : Number(val),
    z.number().int().positive().default(1)
  ),
  limit: z.preprocess(
    (val) => (val === "" || val === undefined) ? 10 : Number(val),
    z.number().int().positive().max(50).default(10)
  )
}).refine(data => {
  // If both min_price and max_price are provided, min_price should be less than or equal to max_price
  if (data.min_price !== undefined && data.max_price !== undefined) {
    return data.min_price <= data.max_price;
  }
  return true;
}, {
  message: "Minimum price must be less than or equal to maximum price",
  path: ["min_price"]
});

export async function listExperiences(prevState, formData) {
  try {
    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Received data:', rawData);

    // Validate data
    const validation = schema.safeParse(rawData);

    // If validation error, return immediately with errors
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Validated data
    const data = validation.data;
    
    // Calculate offset for pagination
    const offset = (data.page - 1) * data.limit;
    
    // Get Supabase client (no need to be authenticated to list experiences)
    const { supabase } = await requireAuth({ redirectTo: null });
    
    // Start building the base query
    let query = supabase
      .from('experiences')
      .select(`
        id,
        title,
        description,
        duration_minutes,
        min_participants,
        max_participants,
        cover_image,
        created_at,
        created_by,
        cancellation_policy:cancellation_policies(id, title),
        price_tiers:experience_price_tiers(
          min_people,
          max_people,
          adult_price,
          teen_price,
          child_price
        ),
        tags:experience_tags(
          tag:tags(
            id,
            name,
            type,
            slug
          )
        )
      `, { count: 'exact' })
      .eq('marketplace', false) // Only guide experiences, not marketplace
      .eq('status', 'published'); // Only published experiences
    
    // Apply search filter if provided
    if (data.search) {
      query = query.ilike('title', `%${data.search}%`);
    }
    
    // Apply city filter if provided
    if (data.city) {
      // Use a subquery to filter by city tag
      const { data: cityTags, error: cityTagsError } = await supabase
        .from('tags')
        .select('id')
        .eq('type', 'city')
        .ilike('name', `%${data.city}%`);
      
      if (cityTagsError) {
        console.error("Error fetching city tags:", cityTagsError);
        return {
          success: false,
          errors: {
            _form: "Error fetching city tags: " + cityTagsError.message,
          },
        };
      }
      
      if (cityTags && cityTags.length > 0) {
        const cityTagIds = cityTags.map(tag => tag.id);
        
        // Get experience IDs that have these city tags
        const { data: experienceIds, error: experienceIdsError } = await supabase
          .from('experience_tags')
          .select('experience_id')
          .in('tag_id', cityTagIds);
        
        if (experienceIdsError) {
          console.error("Error fetching experiences by city:", experienceIdsError);
          return {
            success: false,
            errors: {
              _form: "Error fetching experiences by city: " + experienceIdsError.message,
            },
          };
        }
        
        if (experienceIds && experienceIds.length > 0) {
          query = query.in('id', experienceIds.map(item => item.experience_id));
        } else {
          // No experiences found with this city, return empty result
          return {
            success: true,
            data: {
              experiences: [],
              pagination: {
                total: 0,
                page: data.page,
                limit: data.limit,
                totalPages: 0
              }
            }
          };
        }
      }
    }
    
    // Apply activity filter if provided
    if (data.activity) {
      // Use a subquery to filter by activity tag
      const { data: activityTags, error: activityTagsError } = await supabase
        .from('tags')
        .select('id')
        .eq('type', 'activity')
        .ilike('name', `%${data.activity}%`);
      
      if (activityTagsError) {
        console.error("Error fetching activity tags:", activityTagsError);
        return {
          success: false,
          errors: {
            _form: "Error fetching activity tags: " + activityTagsError.message,
          },
        };
      }
      
      if (activityTags && activityTags.length > 0) {
        const activityTagIds = activityTags.map(tag => tag.id);
        
        // Get experience IDs that have these activity tags
        const { data: experienceIds, error: experienceIdsError } = await supabase
          .from('experience_tags')
          .select('experience_id')
          .in('tag_id', activityTagIds);
        
        if (experienceIdsError) {
          console.error("Error fetching experiences by activity:", experienceIdsError);
          return {
            success: false,
            errors: {
              _form: "Error fetching experiences by activity: " + experienceIdsError.message,
            },
          };
        }
        
        if (experienceIds && experienceIds.length > 0) {
          query = query.in('id', experienceIds.map(item => item.experience_id));
        } else {
          // No experiences found with this activity, return empty result
          return {
            success: true,
            data: {
              experiences: [],
              pagination: {
                total: 0,
                page: data.page,
                limit: data.limit,
                totalPages: 0
              }
            }
          };
        }
      }
    }
    
    // Apply participants filter if provided
    if (data.participants) {
      query = query.lte('min_participants', data.participants)
                   .gte('max_participants', data.participants);
    }
    
    // Apply sorting
    switch (data.sort_by) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      // Price sorting will be handled after fetching the data
    }
    
    // Apply pagination
    query = query.range(offset, offset + data.limit - 1);
    
    // Execute the query
    const { data: experiences, error, count } = await query;
    
    if (error) {
      console.error("Error listing experiences:", error);
      return {
        success: false,
        errors: {
          _form: "Error listing experiences: " + error.message,
        },
      };
    }
    
    // Fetch guide profiles separately
    const guideIds = experiences ? experiences.map(exp => exp.created_by) : [];
    let guideProfiles = {};
    
    if (guideIds.length > 0) {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', guideIds);
      
      if (profilesError) {
        console.error("Error fetching guide profiles:", profilesError);
      } else if (profiles) {
        // Create a map of guide profiles by ID
        guideProfiles = profiles.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {});
      }
    }
    
    // Process the results
    let processedExperiences = experiences ? experiences.map(exp => {
      // Calculate minimum price from price tiers
      const minAdultPrice = Math.min(...exp.price_tiers.map(tier => tier.adult_price));
      const minTeenPrice = Math.min(...exp.price_tiers.map(tier => tier.teen_price));
      const minChildPrice = Math.min(...exp.price_tiers.map(tier => tier.child_price));
      
      // Extract tags and organize by type
      const tagsByType = {};
      exp.tags.forEach(tagRel => {
        const tag = tagRel.tag;
        if (!tagsByType[tag.type]) {
          tagsByType[tag.type] = [];
        }
        tagsByType[tag.type].push(tag);
      });
      
      // Get guide profile
      const guide = guideProfiles[exp.created_by] || { 
        id: exp.created_by,
        full_name: "Unknown Guide",
        avatar_url: null
      };
      
      return {
        id: exp.id,
        title: exp.title,
        description: exp.description,
        duration_minutes: exp.duration_minutes,
        min_participants: exp.min_participants,
        max_participants: exp.max_participants,
        cover_image: exp.cover_image,
        created_at: exp.created_at,
        guide: guide,
        cancellation_policy: exp.cancellation_policy,
        price_tiers: exp.price_tiers,
        tags: tagsByType,
        min_prices: {
          adult: minAdultPrice,
          teen: minTeenPrice,
          child: minChildPrice
        }
      };
    }) : [];
    
    // Apply price filters if provided (post-processing)
    if (data.min_price !== undefined) {
      processedExperiences = processedExperiences.filter(exp => 
        exp.min_prices.adult >= data.min_price
      );
    }
    
    if (data.max_price !== undefined) {
      processedExperiences = processedExperiences.filter(exp => 
        exp.min_prices.adult <= data.max_price
      );
    }
    
    // Apply price sorting if needed (post-processing)
    if (data.sort_by === 'price_asc') {
      processedExperiences.sort((a, b) => a.min_prices.adult - b.min_prices.adult);
    } else if (data.sort_by === 'price_desc') {
      processedExperiences.sort((a, b) => b.min_prices.adult - a.min_prices.adult);
    }
    
    return { 
      success: true,
      data: {
        experiences: processedExperiences,
        pagination: {
          total: count || 0,
          page: data.page,
          limit: data.limit,
          totalPages: Math.ceil((count || 0) / data.limit)
        }
      }
    };
  } catch (error) {
    console.error("listExperiences error:", error);
    return {
      success: false,
      errors: {
        _form: "Error listing experiences. Please try again.",
      },
    };
  }
}