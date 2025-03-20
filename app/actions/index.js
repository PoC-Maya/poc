/**
 * Arquivo de exportação de todas as Server Actions
 * Gerado automaticamente
 */
// No início do arquivo index.js
const isDev = process.env.NODE_ENV === "development";

// EMAIL
/**
 * @description Enviar email de teste usando Resend
 * @category email
 * @inputModel {
 *   "to": "usuario@exemplo.com",
 *   "subject": "Assunto do email",
 *   "firstName": "Nome"
 * }
 */
import { sendTestEmail as _sendTestEmail } from "./email/tester.js";

_sendTestEmail.metadata = {
  description: "Enviar email de teste",
  category: "Email",
  inputModel: {
    to: "poccancun@gmail.com",
    subject: "Welcome to Xplora Cancun",
    firstName: "Poc Cancun",
  },
  supabaseInfos: {
    dbTables: "",
    dbProcedures: "",
    dbRelations: "",
  },
};

export const sendTestEmail = _sendTestEmail;

// CLOUDINARY
/**
 * @description Assinar upload no Cloudinary
 * @category Cloudinary
 * @inputModel {
 *   folder: "blog" // folder onde o upload será feito
 * }
 */
import { getCloudinarySignature as _getCloudinarySignature } from "./utils/cloudinarySignature.js";

_getCloudinarySignature.metadata = {
  description: "Assinar upload no Cloudinary",
  category: " utilitario",
  inputModel: {
    folder: "blog",
  },
  supabaseInfos: {
    dbTables: "",
    dbProcedures: "",
    dbRelations: "",
  },
};

export const getCloudinarySignature = _getCloudinarySignature;

// ADMIN
/**
 * @description Obtém logs de auditoria do sistema
 * @category Admin
 * @inputModel {
 *   startDate: string,
 *   endDate: string,
 *   userId: string,
 *   actionType: string,
 *   page: number,
 *   limit: number
 * }
 * @dbTables audit_logs(SELECT), users(SELECT)
 * @dbProcedures sp_get_audit_logs
 * @dbRelations audit_logs.user_id->users.id
 */
import { getAuditLogs as _getAuditLogs } from "./admin/getAuditLogs.js";

/**
 * @description Obtém estatísticas para o dashboard administrativo
 * @category Admin
 * @inputModel {
 *   period: string
 * }
 * @dbTables bookings(SELECT), users(SELECT), experiences(SELECT), reviews(SELECT), payments(SELECT)
 * @dbProcedures sp_get_dashboard_stats
 * @dbRelations bookings.user_id->users.id, bookings.experience_id->experiences.id, reviews.booking_id->bookings.id, payments.booking_id->bookings.id
 */
import { getDashboardStats as _getDashboardStats } from "./admin/getDashboardStats.js";

/**
 * @description Verifica a saúde do sistema
 * @category Admin
 * @inputModel {}
 * @dbTables system_health(SELECT), system_logs(SELECT)
 * @dbProcedures sp_check_system_health
 * @dbRelations system_health.log_id->system_logs.id
 */
import { getSystemHealth as _getSystemHealth } from "./admin/getSystemHealth.js";

/**
 * @description Lista usuários do sistema
 * @category Admin
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   status: string,
 *   role: string,
 *   search: string
 * }
 * @dbTables users(SELECT), user_roles(SELECT), profiles(SELECT)
 * @dbProcedures sp_list_users
 * @dbRelations users.id->profiles.user_id, users.role_id->user_roles.id
 */
import { listUsers as _listUsers } from "./admin/listUsers.js";

/**
 * @description Gerencia categorias de experiências
 * @category Admin
 * @inputModel {
 *   action: string,
 *   categoryId: string,
 *   name: string,
 *   description: string,
 *   icon: string
 * }
 * @dbTables categories(SELECT,INSERT,UPDATE,DELETE), experiences_categories(SELECT,UPDATE)
 * @dbProcedures sp_manage_categories
 * @dbRelations categories.id->experiences_categories.category_id
 */
import { manageCategories as _manageCategories } from "./admin/manageCategories.js";

/**
 * @description Gerencia localizações disponíveis no sistema
 * @category Admin
 * @inputModel {
 *   action: string,
 *   locationId: string,
 *   name: string,
 *   country: string,
 *   state: string,
 *   city: string,
 *   coordinates: object
 * }
 * @dbTables locations(SELECT,INSERT,UPDATE,DELETE), experiences_locations(SELECT,UPDATE)
 * @dbProcedures sp_manage_locations
 * @dbRelations locations.id->experiences_locations.location_id
 */
import { manageLocations as _manageLocations } from "./admin/manageLocations.js";

/**
 * @description Atualiza o status de um usuário
 * @category Admin
 * @inputModel {
 *   userId: string,
 *   status: string,
 *   reason: string
 * }
 * @dbTables users(SELECT,UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_update_user_status
 * @dbRelations audit_logs.user_id->users.id
 */
import { updateUserStatus as _updateUserStatus } from "./admin/updateUserStatus.js";

/**
 * @description Altera a senha do usuário
 * @category Auth
 * @inputModel {
 *   currentPassword: string,
 *   newPassword: string
 * }
 * @dbTables users(SELECT,UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_change_password
 * @dbRelations audit_logs.user_id->users.id
 */
import { changePassword as _changePassword } from "./auth/changePassword.js";

/**
 * @description Exclui a conta do usuário
 * @category Auth
 * @inputModel {
 *   password: string,
 *   reason: string
 * }
 * @dbTables ""
 * @dbProcedures delete_account
 * @dbRelations ""
 */
import { deleteAccount as _deleteAccount } from "./auth/deleteAccount.js";

/**
 * @description Realiza login do usuário
 * @category Auth
 * @inputModel {
 *   email: string,
 *   password: string
 * }
 * @dbTables users(SELECT,UPDATE), audit_logs(INSERT), sessions(INSERT)
 * @dbProcedures sp_user_login
 * @dbRelations sessions.user_id->users.id, audit_logs.user_id->users.id
 */
import { login as _login } from "./auth/login.js";

/**
 * @description Realiza logout do usuário
 * @category Auth
 * @inputModel {}
 * @dbTables sessions(UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_user_logout
 * @dbRelations sessions.user_id->users.id, audit_logs.user_id->users.id
 */
import { logout as _logout } from "./auth/logout.js";

/**
 * @description Registra um novo usuário
 * @category Auth
 * @inputModel {
 *   email: string,
 *   password: string,
 *   name: string,
 *   role: string
 * }
 * @dbTables users(INSERT), profiles(INSERT), user_settings(INSERT), audit_logs(INSERT)
 * @dbProcedures sp_register_user
 * @dbRelations users.id->profiles.user_id, users.id->user_settings.user_id, audit_logs.user_id->users.id
 */
import { register as _register } from "./auth/register.js";

/**
 * @description Redefine a senha do usuário
 * @category Auth
 * @inputModel {
 *   token: string,
 *   newPassword: string
 * }
 * @dbTables users(SELECT,UPDATE), password_reset_tokens(SELECT,UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_reset_password
 * @dbRelations password_reset_tokens.user_id->users.id, audit_logs.user_id->users.id
 */
import { resetPassword as _resetPassword } from "./auth/resetPassword.js";

/**
 * @description Salva consentimento do usuário
 * @category Auth
 * @inputModel {
 *   consentType: string,
 *   value: boolean
 * }
 * @dbTables user_consents(INSERT,UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_save_user_consent
 * @dbRelations user_consents.user_id->users.id, audit_logs.user_id->users.id
 */
import { saveConsent as _saveConsent } from "./auth/saveConsent.js";

/**
 * @description Atualiza preferências do usuário
 * @category Auth
 * @inputModel {
 *   preferences: object
 * }
 * @dbTables user_settings(SELECT,UPDATE), audit_logs(INSERT)
 * @dbProcedures sp_update_user_preferences
 * @dbRelations user_settings.user_id->users.id, audit_logs.user_id->users.id
 */
import { updatePreferences as _updatePreferences } from "./auth/updatePreferences.js";

/**
 * @description Atualiza perfil do usuário
 * @category Auth
 * @inputModel {
 *   name: string,
 *   bio: string,
 *   phone: string,
 *   avatar: string,
 *   language: string
 * }
 * @dbTables profiles(SELECT,UPDATE), users(SELECT), audit_logs(INSERT)
 * @dbProcedures sp_update_user_profile
 * @dbRelations profiles.user_id->users.id, audit_logs.user_id->users.id
 */
import { updateProfile as _updateProfile } from "./auth/updateProfile.js";

/**
/**
 * @description Atualizar avatar do perfil do usuário
 * @category Auth
 * @inputModel {
 *   "avatar": [File] ou "avatar": "https://res.cloudinary.com/..."
 * }
 *
 * @dbTables profiles(SELECT,UPDATE), users(SELECT), audit_logs(INSERT)
 * @dbProcedures sp_update_user_profile
 * @dbRelations profiles.user_id->users.id, audit_logs.user_id->users.id
 */
import { updateProfileAvatar as _updateProfileAvatar } from "./auth/updateProfileAvatar.js";

/**
 * @description Adiciona exceção à disponibilidade
 * @category Availability
 * @inputModel {
 *   date: string,
 *   reason: string,
 *   guideId: string
 * }
 * @dbTables availability_exceptions(INSERT), guides(SELECT)
 * @dbProcedures sp_add_availability_exception
 * @dbRelations availability_exceptions.guide_id->guides.id, guides.user_id->users.id
 */
import { addException as _addException } from "./availability/addException.js";

/**
 * @description Adiciona bloco de tempo à disponibilidade
 * @category Availability
 * @inputModel {
 *   dayOfWeek: number,
 *   startTime: string,
 *   endTime: string,
 *   guideId: string,
 *   templateId: string
 * }
 * @dbTables availability_time_blocks(INSERT), availability_templates(SELECT), guides(SELECT)
 * @dbProcedures sp_add_time_block
 * @dbRelations availability_time_blocks.template_id->availability_templates.id, availability_templates.guide_id->guides.id, guides.user_id->users.id
 */
import { addTimeBlock as _addTimeBlock } from "./availability/addTimeBlock.js";

/**
 * @description Cria template de disponibilidade
 * @category Availability
 * @inputModel {
 *   name: string,
 *   description: string,
 *   isDefault: boolean,
 *   guideId: string
 * }
 * @dbTables availability_templates(INSERT), guides(SELECT)
 * @dbProcedures sp_create_availability_template
 * @dbRelations availability_templates.guide_id->guides.id, guides.user_id->users.id
 */
import { createAvailabilityMarketplaceExperience as _createAvailabilityMarketplaceExperience } from "./availability/createAvailabilityMarketplaceExperience.js";

/**
 * @description Obtém datas disponíveis
 * @category Availability
 * @inputModel {
 *   experienceId: string,
 *   startDate: string,
 *   endDate: string
 * }
 * @dbTables experiences(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT), availability_exceptions(SELECT), bookings(SELECT)
 * @dbProcedures sp_get_available_dates
 * @dbRelations experiences.guide_id->guides.id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id, guides.id->availability_exceptions.guide_id, experiences.id->bookings.experience_id
 */
import { getAvailableDates as _getAvailableDates } from "./availability/getAvailableDates.js";

/**
 * @description Obtém horários disponíveis
 * @category Availability
 * @inputModel {
 *   experienceId: string,
 *   date: string
 * }
 * @dbTables experiences(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT), availability_exceptions(SELECT), bookings(SELECT)
 * @dbProcedures sp_get_available_times
 * @dbRelations experiences.guide_id->guides.id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id, guides.id->availability_exceptions.guide_id, experiences.id->bookings.experience_id
 */
import { getAvailableTimes as _getAvailableTimes } from "./availability/getAvailableTimes.js";

/**
 * @description Remove exceção de disponibilidade
 * @category Availability
 * @inputModel {
 *   exceptionId: string,
 *   guideId: string
 * }
 * @dbTables availability_exceptions(SELECT,DELETE), guides(SELECT)
 * @dbProcedures sp_remove_availability_exception
 * @dbRelations availability_exceptions.guide_id->guides.id, guides.user_id->users.id
 */
import { removeException as _removeException } from "./availability/removeException.js";

/**
 * @description Remove bloco de tempo da disponibilidade
 * @category Availability
 * @inputModel {
 *   blockId: string,
 *   guideId: string
 * }
 * @dbTables availability_time_blocks(SELECT,DELETE), availability_templates(SELECT), guides(SELECT)
 * @dbProcedures sp_remove_time_block
 * @dbRelations availability_time_blocks.template_id->availability_templates.id, availability_templates.guide_id->guides.id, guides.user_id->users.id
 */
import { removeTimeBlock as _removeTimeBlock } from "./availability/removeTimeBlock.js";

/**
 * @description Atualiza template de disponibilidade
 * @category Availability
 * @inputModel {
 *   templateId: string,
 *   name: string,
 *   description: string,
 *   isDefault: boolean,
 *   guideId: string
 * }
 * @dbTables availability_templates(SELECT,UPDATE), guides(SELECT)
 * @dbProcedures sp_update_availability_template
 * @dbRelations availability_templates.guide_id->guides.id, guides.user_id->users.id
 */
import { updateAvailabilityMarketplaceExperience as _updateAvailabilityMarketplaceExperience } from "./availability/updateAvailabilityMarketplaceExperience.js";

/**
 * @description Cria post no blog
 * @category Blog
 * @inputModel {
 *   title: string,
 *   content: string,
 *   excerpt: string,
 *   featuredImage: string,
 *   tags: array,
 *   status: string
 * }
 * @dbTables blog_posts(INSERT), blog_tags(INSERT), blog_post_tags(INSERT)
 * @dbProcedures sp_create_blog_post
 * @dbRelations blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id
 */
import { createPost as _createPost } from "./blog/createPost.js";

/**
 * @description Exclui post do blog
 * @category Blog
 * @inputModel {
 *   postId: string
 * }
 * @dbTables blog_posts(SELECT,UPDATE), blog_post_tags(DELETE)
 * @dbProcedures sp_delete_blog_post
 * @dbRelations blog_posts.id->blog_post_tags.post_id
 */
import { deletePost as _deletePost } from "./blog/deletePost.js";

/**
 * @description Obtém detalhes de um post
 * @category Blog
 * @inputModel {
 *   postId: string,
 *   slug: string
 * }
 * @dbTables blog_posts(SELECT), blog_tags(SELECT), blog_post_tags(SELECT), users(SELECT)
 * @dbProcedures sp_get_post_details
 * @dbRelations blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id
 */
import { getPostDetails as _getPostDetails } from "./blog/getPostDetails.js";

/**
 * @description Lista posts do blog
 * @category Blog
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   tag: string,
 *   search: string,
 *   status: string
 * }
 * @dbTables blog_posts(SELECT), blog_tags(SELECT), blog_post_tags(SELECT), users(SELECT)
 * @dbProcedures sp_list_blog_posts
 * @dbRelations blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id
 */
import { listPosts as _listPosts } from "./blog/listPosts.js";

/**
 * @description Atualiza post do blog
 * @category Blog
 * @inputModel {
 *   postId: string,
 *   title: string,
 *   content: string,
 *   excerpt: string,
 *   coverImage: [File],
 *   galleryImages:[[File]],
 *   tags: array
 * }
 * @dbTables blog_posts(SELECT,UPDATE), blog_tags(SELECT,INSERT), blog_post_tags(DELETE,INSERT)
 * @dbProcedures sp_update_blog_post
 * @dbRelations blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id
 */
import { updatePost as _updatePost } from "./blog/updatePost.js";

/**
 * @description Calcula preço de uma reserva
 * @category Bookings
 * @inputModel {
 *   experienceId: string,
 *   date: string,
 *   time: string,
 *   participants: number,
 *   addons: array,
 *   couponCode: string
 * }
 * @dbTables experiences(SELECT), experience_pricing(SELECT), experience_addons(SELECT), coupons(SELECT)
 * @dbProcedures sp_calculate_booking_price
 * @dbRelations experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, coupons.experience_id->experiences.id
 */
import { calculateBookingPrice as _calculateBookingPrice } from "./bookings/calculateBookingPrice.js";

/**
 * @description Cancela uma reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   reason: string,
 *   refundAmount: number
 * }
 * @dbTables bookings(SELECT,UPDATE), payments(SELECT,UPDATE), refunds(INSERT), notifications(INSERT)
 * @dbProcedures sp_cancel_booking
 * @dbRelations bookings.id->payments.booking_id, payments.id->refunds.payment_id, bookings.user_id->notifications.user_id
 */
import { cancelBooking as _cancelBooking } from "./bookings/cancelBooking.js";

/**
 * @description Marca uma reserva como concluída
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   notes: string
 * }
 * @dbTables bookings(SELECT,UPDATE), notifications(INSERT)
 * @dbProcedures sp_complete_booking
 * @dbRelations bookings.user_id->notifications.user_id, bookings.guide_id->guides.id
 */
import { completeBooking as _completeBooking } from "./bookings/completeBooking.js";

/**
 * @description Confirma uma reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   notes: string
 * }
 * @dbTables bookings(SELECT,UPDATE), notifications(INSERT)
 * @dbProcedures sp_confirm_booking
 * @dbRelations bookings.user_id->notifications.user_id, bookings.guide_id->guides.id
 */
import { confirmBooking as _confirmBooking } from "./bookings/confirmBooking.js";

/**
 * @description Cria uma nova reserva
 * @category Bookings
 * @inputModel {
 *   experienceId: string,
 *   date: string,
 *   time: string,
 *   participants: number,
 *   addons: array,
 *   specialRequests: string,
 *   contactInfo: object,
 *   couponCode: string
 * }
 * @dbTables bookings(INSERT), booking_addons(INSERT), experiences(SELECT), guides(SELECT), availability_exceptions(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT)
 * @dbProcedures sp_create_booking
 * @dbRelations bookings.experience_id->experiences.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, guides.id->availability_exceptions.guide_id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id
 */
import { createBooking as _createBooking } from "./bookings/createBooking.js";

/**
 * @description Obtém detalhes de uma reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string
 * }
 * @dbTables bookings(SELECT), booking_addons(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT)
 * @dbProcedures sp_get_booking_details
 * @dbRelations bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, bookings.id->payments.booking_id
 */
import { getBookingDetails as _getBookingDetails } from "./bookings/getBookingDetails.js";

/**
 * @description Lista reservas
 * @category Bookings
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   status: string,
 *   userId: string,
 *   guideId: string,
 *   startDate: string,
 *   endDate: string
 * }
 * @dbTables bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)
 * @dbProcedures sp_list_bookings
 * @dbRelations bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id
 */
import { listBookings as _listBookings } from "./bookings/listBookings.js";

/**
 * @description Processa pagamento de uma reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   paymentMethod: string,
 *   paymentDetails: object
 * }
 * @dbTables bookings(SELECT,UPDATE), payments(INSERT), payment_details(INSERT)
 * @dbProcedures sp_process_payment
 * @dbRelations bookings.id->payments.booking_id, payments.id->payment_details.payment_id
 */
import { processPayment as _processPayment } from "./bookings/processPayment.js";

/**
 * @description Envia confirmação de reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   emailMarketplaceExperience: string
 * }
 * @dbTables bookings(SELECT), users(SELECT), experiences(SELECT), guides(SELECT), email_logs(INSERT)
 * @dbProcedures sp_send_booking_confirmation
 * @dbRelations bookings.user_id->users.id, bookings.experience_id->experiences.id, experiences.guide_id->guides.id, users.id->email_logs.user_id
 */
import { sendBookingConfirmation as _sendBookingConfirmation } from "./bookings/sendBookingConfirmation.js";

/**
 * @description Atualiza uma reserva
 * @category Bookings
 * @inputModel {
 *   bookingId: string,
 *   date: string,
 *   time: string,
 *   participants: number,
 *   addons: array,
 *   specialRequests: string
 * }
 * @dbTables bookings(SELECT,UPDATE), booking_addons(DELETE,INSERT), experiences(SELECT), guides(SELECT), availability_exceptions(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT)
 * @dbProcedures sp_update_booking
 * @dbRelations bookings.experience_id->experiences.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, guides.id->availability_exceptions.guide_id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id
 */
import { updateBooking as _updateBooking } from "./bookings/updateBooking.js";

/**
 * @description Cria um novo chat
 * @category Chats
 * @inputModel {
 *   recipientId: string,
 *   initialMessage: string
 * }
 * @dbTables chats(INSERT), chat_messages(INSERT), users(SELECT)
 * @dbProcedures sp_create_chat
 * @dbRelations chats.user1_id->users.id, chats.user2_id->users.id, chats.id->chat_messages.chat_id
 */
import { createChat as _createChat } from "./chats/createChat.js";

/**
 * @description Obtém mensagens de um chat
 * @category Chats
 * @inputModel {
 *   chatId: string,
 *   page: number,
 *   limit: number
 * }
 * @dbTables chats(SELECT), chat_messages(SELECT), users(SELECT)
 * @dbProcedures sp_get_chat_messages
 * @dbRelations chats.id->chat_messages.chat_id, chat_messages.sender_id->users.id
 */
import { getChatMessages as _getChatMessages } from "./chats/getChatMessages.js";

/**
 * @description Lista chats do usuário
 * @category Chats
 * @inputModel {
 *   page: number,
 *   limit: number
 * }
 * @dbTables chats(SELECT), chat_messages(SELECT), users(SELECT)
 * @dbProcedures sp_list_user_chats
 * @dbRelations chats.user1_id->users.id, chats.user2_id->users.id, chats.id->chat_messages.chat_id
 */
import { listChats as _listChats } from "./chats/listChats.js";

/**
 * @description Marca mensagens como lidas
 * @category Chats
 * @inputModel {
 *   chatId: string,
 *   messageIds: array
 * }
 * @dbTables chat_messages(SELECT,UPDATE)
 * @dbProcedures sp_mark_messages_as_read
 * @dbRelations chat_messages.chat_id->chats.id
 */
import { markAsRead as _markAsRead } from "./chats/markAsRead.js";

/**
 * @description Envia mensagem em um chat
 * @category Chats
 * @inputModel {
 *   chatId: string,
 *   message: string,
 *   attachments: array
 * }
 * @dbTables chats(SELECT), chat_messages(INSERT), chat_attachments(INSERT)
 * @dbProcedures sp_send_chat_message
 * @dbRelations chats.id->chat_messages.chat_id, chat_messages.id->chat_attachments.message_id
 */
import { sendMessage as _sendMessage } from "./chats/sendMessage.js";

/**
 * @description Adiciona item ao itinerário de uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   title: string,
 *   description: string,
 *   duration: number,
 *   order: number
 * }
 * @dbTables experiences(SELECT), itinerary_items(INSERT)
 * @dbProcedures sp_add_itinerary_item
 * @dbRelations experiences.id->itinerary_items.experience_id
 */
import { addItineraryItem as _addItineraryItem } from "./experiences/addItineraryItem.js";

/**
 * @description Clona uma experiência existente
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   newTitle: string
 * }
 * @dbTables experiences(SELECT,INSERT), itinerary_items(SELECT,INSERT), experience_pricing(SELECT,INSERT), experience_addons(SELECT,INSERT  itinerary_items(SELECT,INSERT), experience_pricing(SELECT,INSERT), experience_addons(SELECT,INSERT), experience_images(SELECT,INSERT)
 * @dbProcedures sp_clone_experience
 * @dbRelations experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id
 */
import { cloneExperience as _cloneExperience } from "./experiences/cloneExperience.js";

/**
 * @description Criar uma nova experiência do marketplace (apenas para administradores)
 * @category Experiences
 * @inputModel {
 *   // Informações Básicas
 *   "title": "Título da Experiência",
 *   "description": "Descrição detalhada da experiência",
 *   "marketplace_message": "Mensagem para guias que se inscreverem",
 *   "max_guides": 10,
 *   "duration_minutes": 180,
 *   "min_participants": 1,
 *   "max_participants": 10,
 *   "max_adults": 6,
 *   "max_teens": 2,
 *   "max_children": 2,
 *
 *   // Itinerário
 *   "itinerary": [
 *     {"order": 1, "title": "Ponto de encontro", "description": "Encontro no local X", "duration_minutes": 15},
 *     {"order": 2, "title": "Visita ao local Y", "description": "Exploração do local Y", "duration_minutes": 60}
 *   ],
 *
 *   // Preços
 *   "price_tiers": [
 *     {"min_people": 1, "max_people": 2, "adult_price": 100, "teen_price": 90, "child_price": 80},
 *     {"min_people": 3, "max_people": 4, "adult_price": 80, "teen_price": 70, "child_price": 60},
 *     {"min_people": 5, "max_people": 10, "adult_price": 60, "teen_price": 50, "child_price": 0}
 *   ],
 *
 *   // Mídia
 *   "cover_image": "[File ou URL]",
 *   "gallery_images": ["[File ou URL]"],
 *
 *   // Arquivos
 *   "training_files": [
 *     {"title": "Manual de Treinamento", "description": "Guia completo para guias", "file": "[File ou URL]"}
 *   ],
 *   "support_files": [
 *     {"title": "Mapa do Percurso", "description": "Mapa detalhado com pontos de interesse", "file": "[File ou URL]"}
 *   ],
 *
 *   // Questionário
 *   "quiz_questions": [
 *     {
 *       "question": "Qual é o ponto de encontro?",
 *       "options": ["Local A", "Local B", "Local C", "Local D"],
 *       "correct_option": 0,
 *       "order_index": 1,
 *       "is_active": true
 *     }
 *   ],
 *
 *   // Status
 *   "status": "draft" // ou "published"
 * }
 */
import { createMarketplaceExperience as _createMarketplaceExperience } from "./experiences/createMarketplaceExperience.js";

/**
 * @description Criar uma nova experiência do marketplace (apenas para administradores)
 * @category Experiences
 * @inputModel {
 *   // Informações Básicas
 *   "title": "Título da Experiência",
 *   "description": "Descrição detalhada da experiência",
 *   "marketplace_message": "Mensagem para guias que se inscreverem",
 *   "max_guides": 10,
 *   "duration_minutes": 180,
 *   "min_participants": 1,
 *   "max_participants": 10,
 *   "max_adults": 6,
 *   "max_teens": 2,
 *   "max_children": 2,
 *
 *   // Itinerário
 *   "itinerary": [
 *     {"order": 1, "title": "Ponto de encontro", "description": "Encontro no local X", "duration_minutes": 15},
 *     {"order": 2, "title": "Visita ao local Y", "description": "Exploração do local Y", "duration_minutes": 60}
 *   ],
 *
 *   // Preços
 *   "price_tiers": [
 *     {"min_people": 1, "max_people": 2, "adult_price": 100, "teen_price": 90, "child_price": 80},
 *     {"min_people": 3, "max_people": 4, "adult_price": 80, "teen_price": 70, "child_price": 60},
 *     {"min_people": 5, "max_people": 10, "adult_price": 60, "teen_price": 50, "child_price": 0}
 *   ],
 *
 *   // Mídia
 *   "cover_image": "[File ou URL]",
 *   "gallery_images": ["[File ou URL]"],
 *
 *   // Arquivos
 *   "training_files": [
 *     {"title": "Manual de Treinamento", "description": "Guia completo para guias", "file": "[File ou URL]"}
 *   ],
 *   "support_files": [
 *     {"title": "Mapa do Percurso", "description": "Mapa detalhado com pontos de interesse", "file": "[File ou URL]"}
 *   ],
 *
 *   // Questionário
 *   "quiz_questions": [
 *     {
 *       "question": "Qual é o ponto de encontro?",
 *       "options": ["Local A", "Local B", "Local C", "Local D"],
 *       "correct_option": 0,
 *       "order_index": 1,
 *       "is_active": true
 *     }
 *   ],
 *
 *   // Status
 *   "status": "draft" // ou "published"
 * }
 */
import { updateMarketplaceExperience as _updateMarketplaceExperience } from "./experiences/updateMarketplaceExperience.js";

/**
 * @description Cria uma nova experiência
 * @category Experiences
 * @inputModel {
 *   title: string,
 *   description: string,
 *   duration: number,
 *   basePrice: number,
 *   maxParticipants: number,
 *   categories: array,
 *   locationId: string,
 *   languages: array,
 *   includedItems: array,
 *   excludedItems: array
 * }
 * @dbTables experiences(INSERT), experience_pricing(INSERT), experience_categories(INSERT), experience_languages(INSERT), experience_included_items(INSERT), experience_excluded_items(INSERT), guides(SELECT), locations(SELECT), categories(SELECT)
 * @dbProcedures sp_create_experience
 * @dbRelations experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->experience_pricing.experience_id, experiences.id->experience_categories.experience_id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id, experience_categories.category_id->categories.id
 */
import { createExperience as _createExperience } from "./experiences/createExperience.js";

/**
 * @description Exclui uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string
 * }
 * @dbTables experiences(SELECT,UPDATE), itinerary_items(UPDATE), experience_pricing(UPDATE), experience_addons(UPDATE), experience_images(UPDATE), experience_categories(UPDATE), experience_languages(UPDATE)
 * @dbProcedures sp_delete_experience
 * @dbRelations experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id, experiences.id->experience_categories.experience_id, experiences.id->experience_languages.experience_id
 */
import { deleteExperience as _deleteExperience } from "./experiences/deleteExperience.js";

/**
 * @description Exclui item do itinerário
 * @category Experiences
 * @inputModel {
 *   itemId: string,
 *   experienceId: string
 * }
 * @dbTables itinerary_items(SELECT,DELETE), experiences(SELECT)
 * @dbProcedures sp_delete_itinerary_item
 * @dbRelations itinerary_items.experience_id->experiences.id
 */
import { deleteItineraryItem as _deleteItineraryItem } from "./experiences/deleteItineraryItem.js";

/**
 * @description Obtém detalhes de uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   slug: string
 * }
 * @dbTables experiences(SELECT), itinerary_items(SELECT), experience_pricing(SELECT), experience_addons(SELECT), experience_images(SELECT), experience_categories(SELECT), experience_languages(SELECT), experience_included_items(SELECT), experience_excluded_items(SELECT), guides(SELECT), locations(SELECT), categories(SELECT), reviews(SELECT)
 * @dbProcedures sp_get_experience_details
 * @dbRelations experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id, experiences.id->reviews.experience_id
 */
import { getExperienceDetails as _getExperienceDetails } from "./experiences/getExperienceDetails.js";

/**
 * @description Lista experiências
 * @category Experiences
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   categoryId: string,
 *   locationId: string,
 *   priceMin: number,
 *   priceMax: number,
 *   durationMin: number,
 *   durationMax: number,
 *   search: string,
 *   guideId: string,
 *   status: string,
 *   sortBy: string
 * }
 * @dbTables experiences(SELECT), experience_pricing(SELECT), experience_categories(SELECT), guides(SELECT), locations(SELECT), categories(SELECT), reviews(SELECT)
 * @dbProcedures sp_list_experiences
 * @dbRelations experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->experience_pricing.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->reviews.experience_id
 */
import { listExperiences as _listExperiences } from "./experiences/listExperiences.js";

/**
 * @description Traduz uma experiência para outro idioma
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   targetLanguage: string
 * }
 * @dbTables experiences(SELECT,INSERT), experience_translations(INSERT), itinerary_items(SELECT), itinerary_item_translations(INSERT)
 * @dbProcedures sp_translate_experience
 * @dbRelations experiences.id->experience_translations.experience_id, experiences.id->itinerary_items.experience_id, itinerary_items.id->itinerary_item_translations.item_id
 */
import { translateExperience as _translateExperience } from "./experiences/translateExperience.js";

/**
 * @description Atualiza uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   title: string,
 *   description: string,
 *   duration: number,
 *   maxParticipants: number,
 *   categories: array,
 *   locationId: string,
 *   languages: array,
 *   includedItems: array,
 *   excludedItems: array
 * }
 * @dbTables experiences(SELECT,UPDATE), experience_categories(DELETE,INSERT), experience_languages(DELETE,INSERT), experience_included_items(DELETE,INSERT), experience_excluded_items(DELETE,INSERT), locations(SELECT), categories(SELECT)
 * @dbProcedures sp_update_experience
 * @dbRelations experiences.location_id->locations.id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id
 */
import { updateExperience as _updateExperience } from "./experiences/updateExperience.js";

/**
 * @description Atualiza status de uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   status: string,
 *   reason: string
 * }
 * @dbTables experiences(SELECT,UPDATE), experience_status_history(INSERT)
 * @dbProcedures sp_update_experience_status
 * @dbRelations experiences.id->experience_status_history.experience_id
 */
import { updateExperienceStatus as _updateExperienceStatus } from "./experiences/updateExperienceStatus.js";

/**
 * @description Atualiza item do itinerário
 * @category Experiences
 * @inputModel {
 *   itemId: string,
 *   experienceId: string,
 *   title: string,
 *   description: string,
 *   duration: number,
 *   order: number
 * }
 * @dbTables itinerary_items(SELECT,UPDATE), experiences(SELECT)
 * @dbProcedures sp_update_itinerary_item
 * @dbRelations itinerary_items.experience_id->experiences.id
 */
import { updateItineraryItem as _updateItineraryItem } from "./experiences/updateItineraryItem.js";

/**
 * @description Atualiza preços de uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   basePrice: number,
 *   discountPrice: number,
 *   childPrice: number,
 *   groupDiscounts: array,
 *   addons: array
 * }
 * @dbTables experience_pricing(SELECT,UPDATE), experience_addons(DELETE,INSERT), experiences(SELECT)
 * @dbProcedures sp_update_experience_pricing
 * @dbRelations experience_pricing.experience_id->experiences.id, experiences.id->experience_addons.experience_id
 */
import { updatePricing as _updatePricing } from "./experiences/updatePricing.js";

/**
 * @description Faz upload de imagens para uma experiência
 * @category Experiences
 * @inputModel {
 *   experienceId: string,
 *   images: array,
 *   mainImageIndex: number
 * }
 * @dbTables experiences(SELECT,UPDATE), experience_images(INSERT)
 * @dbProcedures sp_upload_experience_images
 * @dbRelations experiences.id->experience_images.experience_id
 */
import { uploadExperienceImages as _uploadExperienceImages } from "./experiences/uploadExperienceImages.js";

/**
 * @description Completa o processo de onboarding de um guia
 * @category Guides
 * @inputModel {
 *   steps: object
 * }
 * @dbTables guides(SELECT,UPDATE), guide_onboarding(INSERT,UPDATE)
 * @dbProcedures sp_complete_guide_onboarding
 * @dbRelations guides.id->guide_onboarding.guide_id
 */
import { completeOnboarding as _completeOnboarding } from "./guides/completeOnboarding.js";

/**
 * @description Obtém detalhes de um guia
 * @category Guides
 * @inputModel {
 *   guideId: string,
 *   userId: string
 * }
 * @dbTables guides(SELECT), guide_languages(SELECT), guide_specialties(SELECT), guide_certifications(SELECT), users(SELECT), profiles(SELECT), experiences(SELECT), reviews(SELECT)
 * @dbProcedures sp_get_guide_details
 * @dbRelations guides.user_id->users.id, users.id->profiles.user_id, guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id, guides.id->guide_certifications.guide_id, guides.id->experiences.guide_id, guides.id->reviews.guide_id
 */
import { getGuideDetails as _getGuideDetails } from "./guides/getGuideDetails.js";

/**
 * @description Obtém estatísticas de um guia
 * @category Guides
 * @inputModel {
 *   period: string
 * }
 * @dbTables guides(SELECT), bookings(SELECT), experiences(SELECT), reviews(SELECT), payments(SELECT)
 * @dbProcedures sp_get_guide_stats
 * @dbRelations guides.id->experiences.guide_id, experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, bookings.id->payments.booking_id
 */
import { getGuideStats as _getGuideStats } from "./guides/getGuideStats.js";

/**
 * @description Lista guias
 * @category Guides
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   status: string,
 *   specialty: string,
 *   language: string,
 *   location: string,
 *   search: string
 * }
 * @dbTables guides(SELECT), users(SELECT), profiles(SELECT), guide_languages(SELECT), guide_specialties(SELECT), experiences(SELECT), locations(SELECT), reviews(SELECT)
 * @dbProcedures sp_list_guides
 * @dbRelations guides.user_id->users.id, users.id->profiles.user_id, guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id, guides.id->experiences.guide_id, experiences.location_id->locations.id, guides.id->reviews.guide_id
 */
import { listGuides as _listGuides } from "./guides/listGuides.js";

/**
 * @description Atualiza taxa de comissão de um guia
 * @category Guides
 * @inputModel {
 *   guideId: string,
 *   commissionRate: number,
 *   reason: string
 * }
 * @dbTables guides(SELECT,UPDATE), commission_history(INSERT)
 * @dbProcedures sp_update_guide_commission
 * @dbRelations guides.id->commission_history.guide_id
 */
import { updateCommissionRate as _updateCommissionRate } from "./guides/updateCommissionRate.js";

/**
 * @description Atualiza perfil de guia
 * @category Guides
 * @inputModel {
 *   // Informações Pessoais
 *   "avatar": "[File]",
 *   "fullName": "Nome Completo",
 *   "city": "Cancun",
 *   "state": "Quintana Roo",
 *   "shortDescription": "Descrição curta do guia",
 *   "fullDescription": "Descrição completa e detalhada do guia",
 *
 *   // Informações Profissionais
 *   "languages": [{"language": "Português", "proficiency": "native"}],
 *   "specialties": ["Mergulho", "Fotografia", "História"],
 *   "certifications": [{"name": "PADI Open Water", "startYear": 2018, "endYear": 2023}],
 *   "education": [{"institution": "UNAM", "course": "Turismo", "startYear": 2010, "endYear": 2014}],
 *   "workExperience": [{"role": "Guia de Mergulho", "company": "Dive Cancun", "startDate": "2015-01", "endDate": "2020-12"}],
 *   "academicExperience": {"title": "Professor de História", "place": "Universidade de Cancun", "date": "2016-2018"},
 *
 *   // Mídia
 *   "photos": ["[File]"],
 *   "youtubeVideos": ["https://youtube.com/watch?v=abc123"],
 *
 *   // Configurações da Conta
 *   "phone": "+5219981234567",
 *   "stripeAccount": "acct_123456",
 *   "commissionRate": 85,
 *
 *   // Preferências de Notificação
 *   "emailNotifications": {"newBookings": true, "newMessages": true, "paymentsReceived": true, "marketingPromotions": true},
 *   "smsNotifications": {"newBookings": true, "newMessages": true, "paymentsReceived": true},
 *
 *   // Configurações de Privacidade
 *   "profileVisibility": "public",
 *   "dataSharing": true,
 *
 *   // Preferências da Plataforma
 *   "language": "en-US",
 *   "currency": "USD",
 *   "dateFormat": "DD/MM/YYYY"
 * }
 * @dbTables guides(SELECT,UPDATE), guide_languages(DELETE,INSERT), guide_specialties(DELETE,INSERT)
 * @dbProcedures sp_update_guide_profile
 * @dbRelations guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id
 */
import { updateGuideProfile as _updateGuideProfile } from "./guides/updateGuideProfile.js";

/**
 * @description Faz upload de certificações de guia
 * @category Guides
 * @inputModel {
 *   certifications: array
 * }
 * @dbTables guides(SELECT), guide_certifications(INSERT)
 * @dbProcedures sp_upload_guide_certifications
 * @dbRelations guides.id->guide_certifications.guide_id
 */
import { uploadCertifications as _uploadCertifications } from "./guides/uploadCertifications.js";

/**
 * @description Verifica um guia
 * @category Guides
 * @inputModel {
 *   guideId: string,
 *   status: string,
 *   notes: string
 * }
 * @dbTables guides(SELECT,UPDATE), guide_verification_history(INSERT), notifications(INSERT)
 * @dbProcedures sp_verify_guide
 * @dbRelations guides.id->guide_verification_history.guide_id, guides.user_id->notifications.user_id
 */
import { verifyGuide as _verifyGuide } from "./guides/verifyGuide.js";

/**
 * @description Inscreve-se em um template de experiência
 * @category Marketplace
 * @inputModel {
 *   templateId: string
 * }
 * @dbTables template_enrollments(INSERT), experience_templates(SELECT), guides(SELECT)
 * @dbProcedures sp_enroll_in_template
 * @dbRelations template_enrollments.template_id->experience_templates.id, template_enrollments.guide_id->guides.id
 */
import { enrollInMarketplaceExperience as _enrollInMarketplaceExperience } from "./marketplace/enrollInMarketplaceExperience.js";

/**
 * @description Obtém detalhes de um template
 * @category Marketplace
 * @inputModel {
 *   templateId: string
 * }
 * @dbTables experience_templates(SELECT), template_itinerary_items(SELECT), template_pricing(SELECT), template_addons(SELECT), template_images(SELECT), template_categories(SELECT), template_languages(SELECT), template_included_items(SELECT), template_excluded_items(SELECT), locations(SELECT), categories(SELECT)
 * @dbProcedures sp_get_template_details
 * @dbRelations experience_templates.location_id->locations.id, experience_templates.id->template_itinerary_items.template_id, experience_templates.id->template_pricing.template_id, experience_templates.id->template_addons.template_id, experience_templates.id->template_images.template_id, experience_templates.id->template_categories.template_id, template_categories.category_id->categories.id, experience_templates.id->template_languages.template_id, experience_templates.id->template_included_items.template_id, experience_templates.id->template_excluded_items.template_id
 */
import { getMarketplaceExperienceDetails as _getMarketplaceExperienceDetails } from "./marketplace/getMarketplaceExperienceDetails.js";

/**
 * @description Lista experiências de template
 * @category Marketplace
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   categoryId: string,
 *   locationId: string,
 *   search: string
 * }
 * @dbTables experience_templates(SELECT), template_pricing(SELECT), template_categories(SELECT), locations(SELECT), categories(SELECT)
 * @dbProcedures sp_list_template_experiences
 * @dbRelations experience_templates.location_id->locations.id, experience_templates.id->template_pricing.template_id, experience_templates.id->template_categories.template_id, template_categories.category_id->categories.id
 */
import { listMarketplaceExperiences as _listMarketplaceExperiences } from "./marketplace/listMarketplaceExperiences.js";

/**
 * @description Cancela inscrição em um template
 * @category Marketplace
 * @inputModel {
 *   templateId: string,
 *   reason: string
 * }
 * @dbTables template_enrollments(SELECT,DELETE), experience_templates(SELECT), guides(SELECT)
 * @dbProcedures sp_unenroll_from_template
 * @dbRelations template_enrollments.template_id->experience_templates.id, template_enrollments.guide_id->guides.id
 */
import { unenrollFromMarketplaceExperience as _unenrollFromMarketplaceExperience } from "./marketplace/unenrollFromMarketplaceExperience.js";

/**
 * @description Obtém notificações não lidas
 * @category Notifications
 * @inputModel {
 *   limit: number
 * }
 * @dbTables notifications(SELECT), users(SELECT)
 * @dbProcedures sp_get_unread_notifications
 * @dbRelations notifications.user_id->users.id
 */
import { getUnreadNotifications as _getUnreadNotifications } from "./notifications/getUnreadNotifications.js";

/**
 * @description Marca notificação como lida
 * @category Notifications
 * @inputModel {
 *   notificationId: string
 * }
 * @dbTables notifications(SELECT,UPDATE)
 * @dbProcedures sp_mark_notification_as_read
 * @dbRelations notifications.user_id->users.id
 */
import { markNotificationAsRead as _markNotificationAsRead } from "./notifications/markNotificationAsRead.js";

/**
 * @description Envia notificação
 * @category Notifications
 * @inputModel {
 *   userId: string,
 *   type: string,
 *   title: string,
 *   message: string,
 *   data: object
 * }
 * @dbTables notifications(INSERT), users(SELECT)
 * @dbProcedures sp_send_notification
 * @dbRelations notifications.user_id->users.id
 */
import { sendNotification as _sendNotification } from "./notifications/sendNotification.js";

/**
 * @description Atualiza preferências de notificação
 * @category Notifications
 * @inputModel {
 *   preferences: object
 * }
 * @dbTables notification_preferences(SELECT,UPDATE), users(SELECT)
 * @dbProcedures sp_update_notification_preferences
 * @dbRelations notification_preferences.user_id->users.id
 */
import { updateNotificationPreferences as _updateNotificationPreferences } from "./notifications/updateNotificationPreferences.js";

/**
 * @description Aprova uma cotação
 * @category Quotations
 * @inputModel {
 *   quotationId: string,
 *   notes: string
 * }
 * @dbTables quotations(SELECT,UPDATE), notifications(INSERT)
 * @dbProcedures sp_approve_quotation
 * @dbRelations quotations.user_id->notifications.user_id
 */
import { approveQuotation as _approveQuotation } from "./quotations/approveQuotation.js";

/**
 * @description Converte cotação em reserva
 * @category Quotations
 * @inputModel {
 *   quotationId: string
 * }
 * @dbTables quotations(SELECT,UPDATE), bookings(INSERT), booking_addons(INSERT)
 * @dbProcedures sp_convert_quotation_to_booking
 * @dbRelations quotations.experience_id->bookings.experience_id, quotations.user_id->bookings.user_id, bookings.id->booking_addons.booking_id
 */
import { convertToBooking as _convertToBooking } from "./quotations/convertToBooking.js";

/**
 * @description Cria uma nova cotação
 * @category Quotations
 * @inputModel {
 *   experienceId: string,
 *   date: string,
 *   time: string,
 *   participants: number,
 *   addons: array,
 *   specialRequests: string,
 *   contactInfo: object
 * }
 * @dbTables quotations(INSERT), quotation_addons(INSERT), experiences(SELECT), guides(SELECT)
 * @dbProcedures sp_create_quotation
 * @dbRelations quotations.experience_id->experiences.id, experiences.guide_id->guides.id, quotations.id->quotation_addons.quotation_id
 */
import { createQuotation as _createQuotation } from "./quotations/createQuotation.js";

/**
 * @description Obtém detalhes de uma cotação
 * @category Quotations
 * @inputModel {
 *   quotationId: string
 * }
 * @dbTables quotations(SELECT), quotation_addons(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)
 * @dbProcedures sp_get_quotation_details
 * @dbRelations quotations.experience_id->experiences.id, quotations.user_id->users.id, experiences.guide_id->guides.id, quotations.id->quotation_addons.quotation_id
 */
import { getQuotationDetails as _getQuotationDetails } from "./quotations/getQuotationDetails.js";

/**
 * @description Lista cotações
 * @category Quotations
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   status: string,
 *   userId: string,
 *   guideId: string,
 *   startDate: string,
 *   endDate: string
 * }
 * @dbTables quotations(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)
 * @dbProcedures sp_list_quotations
 * @dbRelations quotations.experience_id->experiences.id, quotations.user_id->users.id, experiences.guide_id->guides.id
 */
import { listQuotations as _listQuotations } from "./quotations/listQuotations.js";

/**
 * @description Rejeita uma cotação
 * @category Quotations
 * @inputModel {
 *   quotationId: string,
 *   reason: string
 * }
 * @dbTables quotations(SELECT,UPDATE), notifications(INSERT)
 * @dbProcedures sp_reject_quotation
 * @dbRelations quotations.user_id->notifications.user_id
 */
import { rejectQuotation as _rejectQuotation } from "./quotations/rejectQuotation.js";

/**
 * @description Atualiza uma cotação
 * @category Quotations
 * @inputModel {
 *   quotationId: string,
 *   price: number,
 *   notes: string,
 *   validUntil: string
 * }
 * @dbTables quotations(SELECT,UPDATE), quotation_history(INSERT)
 * @dbProcedures sp_update_quotation
 * @dbRelations quotations.id->quotation_history.quotation_id
 */
import { updateQuotation as _updateQuotation } from "./quotations/updateQuotation.js";

/**
 * @description Exporta dados do sistema
 * @category Reports
 * @inputModel {
 *   type: string,
 *   format: string,
 *   filters: object,
 *   startDate: string,
 *   endDate: string
 * }
 * @dbTables bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT), reviews(SELECT)
 * @dbProcedures sp_export_data
 * @dbRelations bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->payments.booking_id, experiences.id->reviews.experience_id
 */
import { exportData as _exportData } from "./reports/exportData.js";

/**
 * @description Obtém relatório de reservas
 * @category Reports
 * @inputModel {
 *   startDate: string,
 *   endDate: string,
 *   guideId: string,
 *   status: string
 * }
 * @dbTables bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT)
 * @dbProcedures sp_get_booking_report
 * @dbRelations bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->payments.booking_id
 */
import { getBookingReport as _getBookingReport } from "./reports/getBookingReport.js";

/**
 * @description Obtém relatório de desempenho de experiências
 * @category Reports
 * @inputModel {
 *   startDate: string,
 *   endDate: string,
 *   experienceId: string,
 *   categoryId: string
 * }
 * @dbTables experiences(SELECT), bookings(SELECT), reviews(SELECT), experience_categories(SELECT), categories(SELECT)
 * @dbProcedures sp_get_experience_performance_report
 * @dbRelations experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id
 */
import { getExperiencePerformanceReport as _getExperiencePerformanceReport } from "./reports/getExperiencePerformanceReport.js";

/**
 * @description Obtém relatório de desempenho de guias
 * @category Reports
 * @inputModel {
 *   startDate: string,
 *   endDate: string,
 *   guideId: string
 * }
 * @dbTables guides(SELECT), experiences(SELECT), bookings(SELECT), reviews(SELECT), payments(SELECT)
 * @dbProcedures sp_get_guide_performance_report
 * @dbRelations guides.id->experiences.guide_id, experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, bookings.id->payments.booking_id
 */
import { getGuidePerformanceReport as _getGuidePerformanceReport } from "./reports/getGuidePerformanceReport.js";

/**
 * @description Obtém relatório de receita
 * @category Reports
 * @inputModel {
 *   startDate: string,
 *   endDate: string,
 *   groupBy: string
 * }
 * @dbTables payments(SELECT), bookings(SELECT), experiences(SELECT), guides(SELECT)
 * @dbProcedures sp_get_revenue_report
 * @dbRelations payments.booking_id->bookings.id, bookings.experience_id->experiences.id, experiences.guide_id->guides.id
 */
import { getRevenueReport as _getRevenueReport } from "./reports/getRevenueReport.js";

/**
 * @description Cria uma nova avaliação
 * @category Reviews
 * @inputModel {
 *   experienceId: string,
 *   bookingId: string,
 *   rating: number,
 *   comment: string,
 *   attributes: object
 * }
 * @dbTables reviews(INSERT), review_attributes(INSERT), bookings(SELECT), experiences(SELECT), guides(SELECT)
 * @dbProcedures sp_create_review
 * @dbRelations reviews.experience_id->experiences.id, reviews.booking_id->bookings.id, reviews.guide_id->guides.id, reviews.id->review_attributes.review_id
 */
import { createReview as _createReview } from "./reviews/createReview.js";

/**
 * @description Exclui uma avaliação
 * @category Reviews
 * @inputModel {
 *   reviewId: string,
 *   reason: string
 * }
 * @dbTables reviews(SELECT,UPDATE), review_attributes(UPDATE)
 * @dbProcedures sp_delete_review
 * @dbRelations reviews.id->review_attributes.review_id
 */
import { deleteReview as _deleteReview } from "./reviews/deleteReview.js";

/**
 * @description Obtém estatísticas de avaliações
 * @category Reviews
 * @inputModel {
 *   experienceId: string,
 *   guideId: string
 * }
 * @dbTables reviews(SELECT), review_attributes(SELECT), experiences(SELECT), guides(SELECT)
 * @dbProcedures sp_get_review_stats
 * @dbRelations reviews.experience_id->experiences.id, reviews.guide_id->guides.id, reviews.id->review_attributes.review_id
 */
import { getReviewStats as _getReviewStats } from "./reviews/getReviewStats.js";

/**
 * @description Lista avaliações
 * @category Reviews
 * @inputModel {
 *   page: number,
 *   limit: number,
 *   experienceId: string,
 *   guideId: string,
 *   userId: string,
 *   minRating: number,
 *   maxRating: number
 * }
 * @dbTables reviews(SELECT), review_attributes(SELECT), experiences(SELECT), guides(SELECT), users(SELECT)
 * @dbProcedures sp_list_reviews
 * @dbRelations reviews.experience_id->experiences.id, reviews.guide_id->guides.id, reviews.user_id->users.id, reviews.id->review_attributes.review_id
 */
import { listReviews as _listReviews } from "./reviews/listReviews.js";

/**
 * @description Atualiza uma avaliação
 * @category Reviews
 * @inputModel {
 *   reviewId: string,
 *   rating: number,
 *   comment: string,
 *   attributes: object
 * }
 * @dbTables reviews(SELECT,UPDATE), review_attributes(DELETE,INSERT)
 * @dbProcedures sp_update_review
 * @dbRelations reviews.id->review_attributes.review_id
 */
import { updateReview as _updateReview } from "./reviews/updateReview.js";

/**
 * @description Exclui uma imagem
 * @category Utils
 * @inputModel {
 *   imageId: string,
 *   type: string
 * }
 * @dbTables experience_images(SELECT,DELETE), blog_images(SELECT,DELETE), guide_certifications(SELECT,DELETE)
 * @dbProcedures sp_delete_image
 * @dbRelations experience_images.experience_id->experiences.id, blog_images.post_id->blog_posts.id, guide_certifications.guide_id->guides.id
 */
import { deleteImage as _deleteImage } from "./utils/deleteImage.js";

/**
 * @description Gera slug para URL
 * @category Utils
 * @inputModel {
 *   text: string,
 *   type: string,
 *   id: string
 * }
 * @dbTables experiences(SELECT), blog_posts(SELECT)
 * @dbProcedures sp_generate_slug
 * @dbRelations null
 */
import { generateSlug as _generateSlug } from "./utils/generateSlug.js";

/**
 * @description Obtém coordenadas de uma localização
 * @category Utils
 * @inputModel {
 *   address: string,
 *   city: string,
 *   country: string
 * }
 * @dbTables locations(SELECT,INSERT)
 * @dbProcedures sp_get_location_coordinates
 * @dbRelations null
 */
import { getLocationCoordinates as _getLocationCoordinates } from "./utils/getLocationCoordinates.js";

/**
 * @description Traduz texto para outro idioma
 * @category Utils
 * @inputModel {
 *   text: string,
 *   sourceLanguage: string,
 *   targetLanguage: string
 * }
 * @dbTables translation_cache(SELECT,INSERT)
 * @dbProcedures sp_translate_text
 * @dbRelations null
 */
import { translateText as _translateText } from "./utils/translateText.js";

/**
 * @description Faz upload de imagem
 * @category Utils
 * @inputModel {
 *   image: file,
 *   type: string,
 *   id: string
 * }
 * @dbTables experience_images(INSERT), blog_images(INSERT), profiles(UPDATE)
 * @dbProcedures sp_upload_image
 * @dbRelations experience_images.experience_id->experiences.id, blog_images.post_id->blog_posts.id, profiles.user_id->users.id
 */
import { uploadImage as _uploadImage } from "./utils/uploadImage.js";

/**
 * @description Valida cupom de desconto
 * @category Utils
 * @inputModel {
 *   code: string,
 *   experienceId: string,
 *   date: string
 * }
 * @dbTables coupons(SELECT), coupon_usages(SELECT), experiences(SELECT)
 * @dbProcedures sp_validate_coupon
 * @dbRelations coupons.experience_id->experiences.id, coupons.id->coupon_usages.coupon_id
 */
import { validateCoupon as _validateCoupon } from "./utils/validateCoupon.js";

// Adicionar metadados e re-exportar

_getAuditLogs.metadata = {
  description: " Obter logs de auditoria",
  category: " admin",
  inputModel: {
    tableName: "experiences", // Opcional, filtrar por tabela
    recordId: "record_123", // Opcional, filtrar por registro
    operation: "UPDATE", // 'INSERT', 'UPDATE', 'DELETE'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    page: 1,
    limit: 50,
  },

  supabaseInfos: {
    dbTables: "audit_logs(SELECT), users(SELECT)",
    dbProcedures: "sp_get_audit_logs",
    dbRelations: "audit_logs.user_id->users.id",
  },
};

export const getAuditLogs = _getAuditLogs;

_getDashboardStats.metadata = {
  description: " Obter estatísticas do dashboard",
  category: " admin",
  inputModel: {
    period: "month", // 'day', 'week', 'month', 'year'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), users(SELECT), experiences(SELECT), reviews(SELECT), payments(SELECT)",
    dbProcedures: "sp_get_dashboard_stats",
    dbRelations:
      "bookings.user_id->users.id, bookings.experience_id->experiences.id, reviews.booking_id->bookings.id, payments.booking_id->bookings.id",
  },
};

export const getDashboardStats = _getDashboardStats;

_getSystemHealth.metadata = {
  description: " Verificar saúde do sistema",
  category: " admin",
  inputModel: { checkDatabase: true, checkStorage: true, checkPayments: true },

  supabaseInfos: {
    dbTables: "system_health(SELECT), system_logs(SELECT)",
    dbProcedures: "sp_check_system_health",
    dbRelations: "system_health.log_id->system_logs.id",
  },
};

export const getSystemHealth = _getSystemHealth;

_listUsers.metadata = {
  description: " Listar usuários",
  category: " admin",
  inputModel: {
    userType: "guide", // 'tourist', 'guide', 'admin'
    status: "active", // 'active', 'inactive'
    search: "termo de busca",
    page: 1,
    limit: 20,
  },

  supabaseInfos: {
    dbTables: "users(SELECT), user_roles(SELECT), profiles(SELECT)",
    dbProcedures: "sp_list_users",
    dbRelations: "users.id->profiles.user_id, users.role_id->user_roles.id",
  },
};

export const listUsers = _listUsers;

_manageCategories.metadata = {
  description: " Gerenciar categorias",
  category: " admin",
  inputModel: {
    operation: "create", // 'create', 'update', 'delete'
    categoryId: "category_123", // Para update/delete
    name: "Nova Categoria",
    slug: "nova-categoria",
    icon: "icon-name",
  },

  supabaseInfos: {
    dbTables:
      "categories(SELECT,INSERT,UPDATE,DELETE), experiences_categories(SELECT,UPDATE)",
    dbProcedures: "sp_manage_categories",
    dbRelations: "categories.id->experiences_categories.category_id",
  },
};

export const manageCategories = _manageCategories;

_manageLocations.metadata = {
  description: " Gerenciar localizações",
  category: " admin",
  inputModel: {
    operation: "create", // 'create', 'update', 'delete'
    locationId: "location_123", // Para update/delete
    name: "Nova Localização",
    country: "Brasil",
    state: "São Paulo",
    latitude: -23.55052,
    longitude: -46.633308,
  },

  supabaseInfos: {
    dbTables:
      "locations(SELECT,INSERT,UPDATE,DELETE), experiences_locations(SELECT,UPDATE)",
    dbProcedures: "sp_manage_locations",
    dbRelations: "locations.id->experiences_locations.location_id",
  },
};

export const manageLocations = _manageLocations;

_updateUserStatus.metadata = {
  description: " Atualizar status do usuário",
  category: " admin",
  inputModel: {
    userId: "user_123",
    isActive: false,
    reason: "Conta suspensa por violação dos termos",
  },

  supabaseInfos: {
    dbTables: "users(SELECT,UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_update_user_status",
    dbRelations: "audit_logs.user_id->users.id",
  },
};

export const updateUserStatus = _updateUserStatus;

_changePassword.metadata = {
  description: " Alterar senha || Ok",
  category: " auth",
  inputModel: {
    currentPassword: "senhaAtual",
    newPassword: "novaSenha",
    confirmPassword: "novaSenha",
  },

  supabaseInfos: {
    dbTables: "users(SELECT,UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_change_password",
    dbRelations: "audit_logs.user_id->users.id",
  },
};

export const changePassword = _changePassword;

_deleteAccount.metadata = {
  description: " Excluir conta (com anonimização) || OK",
  category: " auth",
  inputModel: { password: "senha123", reason: "Motivo da exclusão" },

  supabaseInfos: {
    dbTables:
      "users(SELECT,UPDATE), profiles(UPDATE), bookings(UPDATE), experiences(UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_delete_account",
    dbRelations:
      "users.id->profiles.user_id, users.id->bookings.user_id, users.id->experiences.guide_id, audit_logs.user_id->users.id",
  },
};

export const deleteAccount = _deleteAccount;

_login.metadata = {
  description: " Autenticar usuário || Ok",
  category: " auth",
  inputModel: { email: "usuario@exemplo.com", password: "senha123" },

  supabaseInfos: {
    dbTables: "users(SELECT,UPDATE), audit_logs(INSERT), sessions(INSERT)",
    dbProcedures: "sp_user_login",
    dbRelations: "sessions.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const login = _login;

_logout.metadata = {
  description: " Encerrar sessão do usuário || Ok",
  category: " auth",
  inputModel: {},

  supabaseInfos: {
    dbTables: "sessions(UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_user_logout",
    dbRelations: "sessions.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const logout = _logout;

_register.metadata = {
  description: " Registrar novo usuário (turista ou guia) || Ok",
  category: " auth",
  inputModel: {
    email: "usuario@exemplo.com",
    password: "senha123",
    fullName: "Nome Completo",
    userType: "tourist", // ou 'guide'
  },

  supabaseInfos: {
    dbTables:
      "users(INSERT), profiles(INSERT), user_settings(INSERT), audit_logs(INSERT)",
    dbProcedures: "sp_register_user",
    dbRelations:
      "users.id->profiles.user_id, users.id->user_settings.user_id, audit_logs.user_id->users.id",
  },
};

export const register = _register;

_resetPassword.metadata = {
  description: " Solicitar/confirmar redefinição de senha",
  category: " auth",
  inputModel: { email: "usuario@exemplo.com" },

  supabaseInfos: {
    dbTables:
      "users(SELECT,UPDATE), password_reset_tokens(SELECT,UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_reset_password",
    dbRelations:
      "password_reset_tokens.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const resetPassword = _resetPassword;

_saveConsent.metadata = {
  description: " Salvar consentimentos LGPD || Ok",
  category: " auth",
  inputModel: { marketing: true, analytics: true, thirdParty: false },

  supabaseInfos: {
    dbTables: "user_consents(INSERT,UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_save_user_consent",
    dbRelations:
      "user_consents.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const saveConsent = _saveConsent;

_updatePreferences.metadata = {
  description: " Atualizar preferências (idioma, notificações) || Ok",
  category: " auth",
  inputModel: {
    language: "en-US",
    notifications: {
      email: true,
      push: false,
      marketing: true,
    },
  },

  supabaseInfos: {
    dbTables: "user_settings(SELECT,UPDATE), audit_logs(INSERT)",
    dbProcedures: "sp_update_user_preferences",
    dbRelations:
      "user_settings.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const updatePreferences = _updatePreferences;

_updateProfile.metadata = {
  description: " Atualizar perfil do usuário || Ok",
  category: " auth",
  inputModel: {
    fullName: "Nome Atualizado",
    phone: "11999999999",
    bio: "Breve descrição sobre mim",
    nationality: "Brazilian",
    language: "en-US",
  },

  supabaseInfos: {
    dbTables: "profiles(SELECT,UPDATE), users(SELECT), audit_logs(INSERT)",
    dbProcedures: "sp_update_user_profile",
    dbRelations: "profiles.user_id->users.id, audit_logs.user_id->users.id",
  },
};

export const updateProfile = _updateProfile;

_updateProfileAvatar.metadata = {
  description: " Atualizar avatar do perfil do usuário || Ok",
  category: " auth",
  inputModel: {
    avatar: "[File]", // Upload file for Cloudinary
  },

  supabaseInfos: {
    dbTables: "profiles(SELECT,UPDATE), users(SELECT)",
    dbProcedures: "",
    dbRelations: "profiles.user_id->users.id",
  },
};

export const updateProfileAvatar = _updateProfileAvatar;

_addException.metadata = {
  description: " Adicionar exceção de disponibilidade",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    exceptionDate: "2023-12-25",
    isAvailable: false,
    reason: "Feriado de Natal",
  },

  supabaseInfos: {
    dbTables: "availability_exceptions(INSERT), guides(SELECT)",
    dbProcedures: "sp_add_availability_exception",
    dbRelations:
      "availability_exceptions.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const addException = _addException;

_addTimeBlock.metadata = {
  description: " Adicionar bloco de horário",
  category: " availability",
  inputModel: {
    templateId: "template_123",
    dayOfWeek: 1, // 0 = Domingo, 1 = Segunda, etc.
    startTime: "09:00",
    endTime: "17:00",
  },

  supabaseInfos: {
    dbTables:
      "availability_time_blocks(INSERT), availability_templates(SELECT), guides(SELECT)",
    dbProcedures: "sp_add_time_block",
    dbRelations:
      "availability_time_blocks.template_id->availability_templates.id, availability_templates.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const addTimeBlock = _addTimeBlock;

_createAvailabilityMarketplaceExperience.metadata = {
  description: " Criar template de disponibilidade",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    name: "Horário Padrão",
    isActive: true,
  },

  supabaseInfos: {
    dbTables: "availability_templates(INSERT), guides(SELECT)",
    dbProcedures: "sp_create_availability_template",
    dbRelations:
      "availability_templates.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const createAvailabilityMarketplaceExperience =
  _createAvailabilityMarketplaceExperience;

_getAvailableDates.metadata = {
  description: " Obter datas disponíveis",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT), availability_exceptions(SELECT), bookings(SELECT)",
    dbProcedures: "sp_get_available_dates",
    dbRelations:
      "experiences.guide_id->guides.id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id, guides.id->availability_exceptions.guide_id, experiences.id->bookings.experience_id",
  },
};

export const getAvailableDates = _getAvailableDates;

_getAvailableTimes.metadata = {
  description: " Obter horários disponíveis para uma data",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    date: "2023-06-15",
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT), availability_exceptions(SELECT), bookings(SELECT)",
    dbProcedures: "sp_get_available_times",
    dbRelations:
      "experiences.guide_id->guides.id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id, guides.id->availability_exceptions.guide_id, experiences.id->bookings.experience_id",
  },
};

export const getAvailableTimes = _getAvailableTimes;

_removeException.metadata = {
  description: " Remover exceção de disponibilidade",
  category: " availability",
  inputModel: { exceptionId: "exception_123" },

  supabaseInfos: {
    dbTables: "availability_exceptions(SELECT,DELETE), guides(SELECT)",
    dbProcedures: "sp_remove_availability_exception",
    dbRelations:
      "availability_exceptions.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const removeException = _removeException;

_removeTimeBlock.metadata = {
  description: " Remover bloco de horário",
  category: " availability",
  inputModel: { blockId: "block_123" },

  supabaseInfos: {
    dbTables:
      "availability_time_blocks(SELECT,DELETE), availability_templates(SELECT), guides(SELECT)",
    dbProcedures: "sp_remove_time_block",
    dbRelations:
      "availability_time_blocks.template_id->availability_templates.id, availability_templates.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const removeTimeBlock = _removeTimeBlock;

_updateAvailabilityMarketplaceExperience.metadata = {
  description: " Atualizar template de disponibilidade",
  category: " availability",
  inputModel: {
    templateId: "template_123",
    name: "Horário de Verão",
    isActive: true,
  },

  supabaseInfos: {
    dbTables: "availability_templates(SELECT,UPDATE), guides(SELECT)",
    dbProcedures: "sp_update_availability_template",
    dbRelations:
      "availability_templates.guide_id->guides.id, guides.user_id->users.id",
  },
};

export const updateAvailabilityMarketplaceExperience =
  _updateAvailabilityMarketplaceExperience;

_createPost.metadata = {
  description: " Criar novo post || Ok",
  category: " blog",
  inputModel: {
    title: "Post Title",
    content: "Full post content in markdown or HTML format",
    excerpt: "Brief summary of the post",
    coverImage: "[File]", // Upload file for Cloudinary
    galleryImages: ["[File]"], // Array of files for gallery in Cloudinary
    videoUrl: "https://www.youtube.com/watch?v=example123", // YouTube video URL
    category: "Travel Tips",
    tags: ["travel", "tips", "tourism"],
    published: false,
  },

  supabaseInfos: {
    dbTables: "blog_posts(INSERT), blog_tags(INSERT), blog_post_tags(INSERT)",
    dbProcedures: "none",
    dbRelations:
      "blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id",
  },
};

export const createPost = _createPost;

_deletePost.metadata = {
  description: " Excluir post || Ok",
  category: " blog",
  inputModel: {
    postId: "7c54946f-a6f1-454c-9eec-878c2852944f",
    softDelete: true,
    deleteImages: true,
  },

  supabaseInfos: {
    dbTables: "blog_posts(SELECT,UPDATE), blog_post_tags(DELETE)",
    dbProcedures: "none",
    dbRelations: "blog_posts.id->blog_post_tags.post_id",
  },
};

export const deletePost = _deletePost;

_getPostDetails.metadata = {
  description: " Obter detalhes de um post || Ok",
  category: " blog",
  inputModel: { slug: "titulo-do-post" },

  supabaseInfos: {
    dbTables:
      "blog_posts(SELECT), blog_tags(SELECT), blog_post_tags(SELECT), users(SELECT)",
    dbProcedures: "sp_get_post_details",
    dbRelations:
      "blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id",
  },
};

export const getPostDetails = _getPostDetails;

_listPosts.metadata = {
  description: " Listar posts || Ok",
  category: " blog",
  inputModel: {
    category: "Dicas de Viagem",
    tag: "viagem",
    published: true,
    page: 1,
    limit: 10,
    sortBy: "date", // 'date', 'title', 'popularity'
    sortOrder: "desc", // 'asc', 'desc'
  },

  supabaseInfos: {
    dbTables:
      "blog_posts(SELECT), blog_tags(SELECT), blog_post_tags(SELECT), users(SELECT)",
    dbProcedures: "sp_list_blog_posts",
    dbRelations:
      "blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id",
  },
};

export const listPosts = _listPosts;

_updatePost.metadata = {
  description: " Atualizar post || Ok",
  category: " blog",
  inputModel: {
    id: "post_123",
    title: "Post Title",
    content: "Full post content in markdown or HTML format",
    excerpt: "Brief summary of the post",
    coverImage: "[File]", // Upload file for Cloudinary
    galleryImages: ["[File]"], // Array of files for gallery in Cloudinary
    videoUrl: "https://www.youtube.com/watch?v=example123", // YouTube video URL
    category: "Travel Tips",
    tags: ["travel", "tips", "tourism"],
    published: false,
  },

  supabaseInfos: {
    dbTables:
      "blog_posts(SELECT,UPDATE), blog_tags(SELECT,INSERT), blog_post_tags(DELETE,INSERT)",
    dbProcedures: "sp_update_blog_post",
    dbRelations:
      "blog_posts.id->blog_post_tags.post_id, blog_tags.id->blog_post_tags.tag_id, blog_posts.author_id->users.id",
  },
};

export const updatePost = _updatePost;

_calculateBookingPrice.metadata = {
  description: " Calcular preço da reserva",
  category: " bookings",
  inputModel: {
    experienceId: "exp_123",
    date: "2023-07-15",
    adultCount: 2,
    teenagerCount: 1,
    childCount: 0,
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), experience_pricing(SELECT), experience_addons(SELECT), coupons(SELECT)",
    dbProcedures: "sp_calculate_booking_price",
    dbRelations:
      "experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, coupons.experience_id->experiences.id",
  },
};

export const calculateBookingPrice = _calculateBookingPrice;

_cancelBooking.metadata = {
  description: " Cancelar reserva",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    reason: "Mudança de planos",
    requestRefund: true,
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT,UPDATE), payments(SELECT,UPDATE), refunds(INSERT), notifications(INSERT)",
    dbProcedures: "sp_cancel_booking",
    dbRelations:
      "bookings.id->payments.booking_id, payments.id->refunds.payment_id, bookings.user_id->notifications.user_id",
  },
};

export const cancelBooking = _cancelBooking;

_completeBooking.metadata = {
  description: " Marcar reserva como concluída",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    notes: "Experiência realizada com sucesso",
  },

  supabaseInfos: {
    dbTables: "bookings(SELECT,UPDATE), notifications(INSERT)",
    dbProcedures: "sp_complete_booking",
    dbRelations:
      "bookings.user_id->notifications.user_id, bookings.guide_id->guides.id",
  },
};

export const completeBooking = _completeBooking;

_confirmBooking.metadata = {
  description: " Confirmar reserva (após pagamento)",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    paymentIntentId: "pi_123456",
    paymentMethod: "card",
  },

  supabaseInfos: {
    dbTables: "bookings(SELECT,UPDATE), notifications(INSERT)",
    dbProcedures: "sp_confirm_booking",
    dbRelations:
      "bookings.user_id->notifications.user_id, bookings.guide_id->guides.id",
  },
};

export const confirmBooking = _confirmBooking;

_createBooking.metadata = {
  description: " Criar nova reserva",
  category: " bookings",
  inputModel: {
    experienceId: "exp_123",
    guideId: "guide_123",
    touristId: "tourist_123",
    bookingDate: "2023-07-15",
    bookingTime: "10:00",
    adultCount: 2,
    teenagerCount: 1,
    childCount: 0,
    adultPrice: 150,
    teenagerPrice: 100,
    childPrice: 75,
    touristName: "Nome do Turista",
    touristEmail: "turista@exemplo.com",
    touristPhone: "11999999999",
    hotel: "Hotel Central",
    specialRequests: "Tenho restrições alimentares",
  },

  supabaseInfos: {
    dbTables:
      "bookings(INSERT), booking_addons(INSERT), experiences(SELECT), guides(SELECT), availability_exceptions(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT)",
    dbProcedures: "sp_create_booking",
    dbRelations:
      "bookings.experience_id->experiences.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, guides.id->availability_exceptions.guide_id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id",
  },
};

export const createBooking = _createBooking;

_getBookingDetails.metadata = {
  description: " Obter detalhes de uma reserva",
  category: " bookings",
  inputModel: { bookingId: "booking_123" },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), booking_addons(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT)",
    dbProcedures: "sp_get_booking_details",
    dbRelations:
      "bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, bookings.id->payments.booking_id",
  },
};

export const getBookingDetails = _getBookingDetails;

_listBookings.metadata = {
  description: " Listar reservas (turista ou guia)",
  category: " bookings",
  inputModel: {
    userId: "user_123",
    userType: "guide", // ou 'tourist'
    status: "confirmed", // 'pending', 'confirmed', 'completed', 'cancelled'
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    page: 1,
    limit: 10,
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)",
    dbProcedures: "sp_list_bookings",
    dbRelations:
      "bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id",
  },
};

export const listBookings = _listBookings;

_processPayment.metadata = {
  description: " Processar pagamento da reserva",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    paymentMethod: {
      type: "card",
      cardNumber: "4242424242424242",
      expMonth: 12,
      expYear: 2025,
      cvc: "123",
    },
    savePaymentMethod: true,
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT,UPDATE), payments(INSERT), payment_details(INSERT)",
    dbProcedures: "sp_process_payment",
    dbRelations:
      "bookings.id->payments.booking_id, payments.id->payment_details.payment_id",
  },
};

export const processPayment = _processPayment;

_sendBookingConfirmation.metadata = {
  description: " Enviar confirmação da reserva",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    sendTo: "email", // 'email', 'sms', 'both'
    language: "pt-BR",
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), users(SELECT), experiences(SELECT), guides(SELECT), email_logs(INSERT)",
    dbProcedures: "sp_send_booking_confirmation",
    dbRelations:
      "bookings.user_id->users.id, bookings.experience_id->experiences.id, experiences.guide_id->guides.id, users.id->email_logs.user_id",
  },
};

export const sendBookingConfirmation = _sendBookingConfirmation;

_updateBooking.metadata = {
  description: " Atualizar reserva",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    bookingDate: "2023-07-16",
    bookingTime: "11:00",
    adultCount: 3,
    teenagerCount: 1,
    childCount: 0,
    specialRequests: "Atualização dos pedidos especiais",
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT,UPDATE), booking_addons(DELETE,INSERT), experiences(SELECT), guides(SELECT), availability_exceptions(SELECT), availability_templates(SELECT), availability_time_blocks(SELECT)",
    dbProcedures: "sp_update_booking",
    dbRelations:
      "bookings.experience_id->experiences.id, experiences.guide_id->guides.id, bookings.id->booking_addons.booking_id, guides.id->availability_exceptions.guide_id, guides.id->availability_templates.guide_id, availability_templates.id->availability_time_blocks.template_id",
  },
};

export const updateBooking = _updateBooking;

_createChat.metadata = {
  description: " Iniciar nova conversa",
  category: " chats",
  inputModel: {
    touristId: "tourist_123",
    guideId: "guide_123",
    initialMessage: "Olá, gostaria de saber mais sobre suas experiências.",
  },

  supabaseInfos: {
    dbTables: "chats(INSERT), chat_messages(INSERT), users(SELECT)",
    dbProcedures: "sp_create_chat",
    dbRelations:
      "chats.user1_id->users.id, chats.user2_id->users.id, chats.id->chat_messages.chat_id",
  },
};

export const createChat = _createChat;

_getChatMessages.metadata = {
  description: " Obter mensagens de uma conversa",
  category: " chats",
  inputModel: { chatId: "chat_123", page: 1, limit: 50 },

  supabaseInfos: {
    dbTables: "chats(SELECT), chat_messages(SELECT), users(SELECT)",
    dbProcedures: "sp_get_chat_messages",
    dbRelations:
      "chats.id->chat_messages.chat_id, chat_messages.sender_id->users.id",
  },
};

export const getChatMessages = _getChatMessages;

_listChats.metadata = {
  description: " Listar conversas",
  category: " chats",
  inputModel: {
    userId: "user_123",
    userType: "tourist", // 'tourist' ou 'guide'
    page: 1,
    limit: 20,
  },

  supabaseInfos: {
    dbTables: "chats(SELECT), chat_messages(SELECT), users(SELECT)",
    dbProcedures: "sp_list_user_chats",
    dbRelations:
      "chats.user1_id->users.id, chats.user2_id->users.id, chats.id->chat_messages.chat_id",
  },
};

export const listChats = _listChats;

_markAsRead.metadata = {
  description: " Marcar mensagens como lidas",
  category: " chats",
  inputModel: {
    chatId: "chat_123",
    userId: "user_123",
    userType: "guide", // 'tourist' ou 'guide'
  },

  supabaseInfos: {
    dbTables: "chat_messages(SELECT,UPDATE)",
    dbProcedures: "sp_mark_messages_as_read",
    dbRelations: "chat_messages.chat_id->chats.id",
  },
};

export const markAsRead = _markAsRead;

_sendMessage.metadata = {
  description: " Enviar mensagem",
  category: " chats",
  inputModel: {
    chatId: "chat_123",
    senderId: "user_123",
    senderType: "tourist", // 'tourist' ou 'guide'
    message: "Mensagem de texto aqui",
  },

  supabaseInfos: {
    dbTables: "chats(SELECT), chat_messages(INSERT), chat_attachments(INSERT)",
    dbProcedures: "sp_send_chat_message",
    dbRelations:
      "chats.id->chat_messages.chat_id, chat_messages.id->chat_attachments.message_id",
  },
};

export const sendMessage = _sendMessage;

_addItineraryItem.metadata = {
  description: " Adicionar item ao itinerário",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    title: "Visita ao Museu",
    description: "Visita guiada ao museu histórico",
    startTime: "10:00",
    duration: 90, // minutos
    orderNum: 2,
  },

  supabaseInfos: {
    dbTables: "experiences(SELECT), itinerary_items(INSERT)",
    dbProcedures: "sp_add_itinerary_item",
    dbRelations: "experiences.id->itinerary_items.experience_id",
  },
};

export const addItineraryItem = _addItineraryItem;

_cloneExperience.metadata = {
  description: " Clonar experiência existente",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    newTitle: "Cópia de Experiência Original",
    customizations: {
      duration: 5,
      meetingPoint: "Novo ponto de encontro",
    },
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT,INSERT), itinerary_items(SELECT,INSERT), experience_pricing(SELECT,INSERT), experience_addons(SELECT,INSERT  itinerary_items(SELECT,INSERT), experience_pricing(SELECT,INSERT), experience_addons(SELECT,INSERT), experience_images(SELECT,INSERT)",
    dbProcedures: "sp_clone_experience",
    dbRelations:
      "experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id",
  },
};

export const cloneExperience = _cloneExperience;

_createMarketplaceExperience.metadata = {
  description: " Criar nova experiência",
  category: " experiences",
  inputModel: {
    title: "Título da Experiência",
    description: "Descrição detalhada da experiência",
    marketplace_message: "Mensagem para guias que se inscreverem",
    max_guides: 10,
    duration_minutes: 180,
    min_participants: 1,
    max_participants: 10,
    max_adults: 6,
    max_teens: 2,
    max_children: 2,
    itinerary: [
      {
        order: 1,
        title: "Ponto de encontro",
        description: "Encontro no local X",
        duration_minutes: 15,
      },
      {
        order: 2,
        title: "Visita ao local Y",
        description: "Exploração do local Y",
        duration_minutes: 60,
      },
    ],
    price_tiers: [
      {
        min_people: 1,
        max_people: 2,
        adult_price: 100,
        teen_price: 90,
        child_price: 80,
      },
      {
        min_people: 3,
        max_people: 4,
        adult_price: 80,
        teen_price: 70,
        child_price: 60,
      },
      {
        min_people: 5,
        max_people: 10,
        adult_price: 60,
        teen_price: 50,
        child_price: 0,
      },
    ],
    cover_image: "[File]",
    gallery_images: ["[File]"],
    training_files: [
      {
        title: "Manual de Treinamento",
        description: "Guia completo para guias",
        file: "[File]",
      },
    ],
    support_files: [
      {
        title: "Mapa do Percurso",
        description: "Mapa detalhado com pontos de interesse",
        file: "[File]",
      },
    ],
    quiz_questions: [
      {
        question: "Qual é o ponto de encontro?",
        options: ["Local A", "Local B", "Local C", "Local D"],
        correct_option: 0,
        order_index: 1,
        is_active: true,
      },
    ],
    status: "draft",
  },

  supabaseInfos: {
    dbTables:
      "experiences(INSERT), experience_pricing(INSERT), experience_categories(INSERT), experience_languages(INSERT), experience_included_items(INSERT), experience_excluded_items(INSERT), guides(SELECT), locations(SELECT), categories(SELECT)",
    dbProcedures: "sp_create_experience",
    dbRelations:
      "experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->experience_pricing.experience_id, experiences.id->experience_categories.experience_id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id, experience_categories.category_id->categories.id",
  },
};

export const createMarketplaceExperience = _createMarketplaceExperience;

_updateMarketplaceExperience.metadata = {
  description: " Update nova experiência do marketplace",
  category: " experiences",
  inputModel: {
    experienceId: "b3763ebf-9016-4403-8938-020c71da3398",
    title: "Edit Título da Experiência",
    description: "Edit Descrição detalhada da experiência",
    marketplace_message: "Edit Mensagem para guias que se inscreverem",
    max_guides: 10,
    duration_minutes: 180,
    min_participants: 1,
    max_participants: 10,
    max_adults: 6,
    max_teens: 2,
    max_children: 2,
    itinerary: [
      {
        order: 1,
        title: "edit Ponto de encontro",
        description: "edit Encontro no local X",
        duration_minutes: 15,
      },
      {
        order: 2,
        title: "edit Visita ao local Y",
        description: "edit Exploração do local Y",
        duration_minutes: 60,
      },
    ],
    price_tiers: [
      {
        min_people: 1,
        max_people: 2,
        adult_price: 100,
        teen_price: 90,
        child_price: 80,
      },
      {
        min_people: 3,
        max_people: 4,
        adult_price: 80,
        teen_price: 70,
        child_price: 60,
      },
      {
        min_people: 5,
        max_people: 10,
        adult_price: 60,
        teen_price: 50,
        child_price: 0,
      },
    ],
    cover_image: "[File]",
    gallery_images: ["[File]"],
    training_files: [
      {
        title: "edit Manual de Treinamento",
        description: "edit Guia completo para guias",
        file: "[File]",
      },
    ],
    support_files: [
      {
        title: "edit Mapa do Percurso",
        description: "edit Mapa detalhado com pontos de interesse",
        file: "[File]",
      },
    ],
    quiz_questions: [
      {
        question: "edit Qual é o ponto de encontro?",
        options: ["Local A", "Local B", "Local C", "Local D"],
        correct_option: 0,
        order_index: 1,
        is_active: true,
      },
    ],
    status: "draft",
  },

  supabaseInfos: {
    dbTables:
      "experiences(INSERT), experience_pricing(INSERT), experience_categories(INSERT), experience_languages(INSERT), experience_included_items(INSERT), experience_excluded_items(INSERT), guides(SELECT), locations(SELECT), categories(SELECT)",
    dbProcedures: "sp_create_experience",
    dbRelations:
      "experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->experience_pricing.experience_id, experiences.id->experience_categories.experience_id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id, experience_categories.category_id->categories.id",
  },
};

export const updateMarketplaceExperience = _updateMarketplaceExperience;

_createExperience.metadata = {
  description: " Criar nova experiência",
  category: " experiences",
  inputModel: {
    // Informações Básicas
    title: "Passeio de Barco em Cancun",
    description:
      "Uma experiência incrível de passeio de barco pelas águas cristalinas de Cancun",
    duration_minutes: 180,
    min_participants: 1,
    max_participants: 10,
    max_adults: 6,
    max_teens: 2,
    max_children: 2,

    // Itinerário
    itinerary: [
      {
        order: 1,
        title: "Ponto de encontro",
        description: "Encontro no píer principal",
        duration_minutes: 15,
      },
      {
        order: 2,
        title: "Passeio de barco",
        description: "Navegação pelas águas cristalinas",
        duration_minutes: 120,
      },
      {
        order: 3,
        title: "Retorno",
        description: "Retorno ao píer principal",
        duration_minutes: 45,
      },
    ],

    // Preços
    price_tiers: [
      {
        min_people: 1,
        max_people: 2,
        adult_price: 100,
        teen_price: 90,
        child_price: 80,
      },
      {
        min_people: 3,
        max_people: 6,
        adult_price: 80,
        teen_price: 70,
        child_price: 60,
      },
      {
        min_people: 7,
        max_people: 10,
        adult_price: 60,
        teen_price: 50,
        child_price: 0,
      },
    ],

    // Mídia (URLs do Cloudinary)
    cover_image: "[File]",
    gallery_images: ["[File]"],

    // Horários de trabalho
    working_hours: [
      { day_of_week: 0, start_time: "09:00:00", end_time: "17:00:00" }, // Domingo
      { day_of_week: 1, start_time: "09:00:00", end_time: "17:00:00" }, // Segunda
      { day_of_week: 5, start_time: "10:00:00", end_time: "18:00:00" }, // Sexta
    ],

    // Tags (apenas IDs)
    tag_ids: [
      "c258e2f7-f580-48ba-abe8-2221a6e9f4f4", // Cancun (city)
      "05977ef3-1b67-46c4-9135-37e0b88d9404", // Passeio de barco (activity)
      "ac67afb2-bbc9-4c8d-bc5c-7092f253f18a", // Água e lanches (service_included)
      "71ce1e06-12b9-46ca-89ec-aaf2c6d030be", // Transporte (service_not_included)
      "f0e2b081-7c25-4f4b-bea4-fecc919f8acf", // Saber nadar (requisitos_especiais)
    ],

    // Política de cancelamento (ID)
    cancellation_policy_id: "949d0e46-62fd-49e9-a074-e307cfd719d5",
  },
  supabaseInfos: {
    dbTables: "",
    dbProcedures: "create_guide_experience",
    dbRelations: "",
  },
};

export const createExperience = _createExperience;

_deleteExperience.metadata = {
  description: " Excluir experiência",
  category: " experiences",
  inputModel: { experienceId: "exp_123", reason: "Experiência descontinuada" },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT,UPDATE), itinerary_items(UPDATE), experience_pricing(UPDATE), experience_addons(UPDATE), experience_images(UPDATE), experience_categories(UPDATE), experience_languages(UPDATE)",
    dbProcedures: "sp_delete_experience",
    dbRelations:
      "experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id, experiences.id->experience_categories.experience_id, experiences.id->experience_languages.experience_id",
  },
};

export const deleteExperience = _deleteExperience;

_deleteItineraryItem.metadata = {
  description: " Remover item do itinerário",
  category: " experiences",
  inputModel: { itemId: "item_123" },

  supabaseInfos: {
    dbTables: "itinerary_items(SELECT,DELETE), experiences(SELECT)",
    dbProcedures: "sp_delete_itinerary_item",
    dbRelations: "itinerary_items.experience_id->experiences.id",
  },
};

export const deleteItineraryItem = _deleteItineraryItem;

_getExperienceDetails.metadata = {
  description: " Obter detalhes de uma experiência",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    language: "pt-BR", // Idioma para tradução, se disponível
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), itinerary_items(SELECT), experience_pricing(SELECT), experience_addons(SELECT), experience_images(SELECT), experience_categories(SELECT), experience_languages(SELECT), experience_included_items(SELECT), experience_excluded_items(SELECT), guides(SELECT), locations(SELECT), categories(SELECT), reviews(SELECT)",
    dbProcedures: "sp_get_experience_details",
    dbRelations:
      "experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->itinerary_items.experience_id, experiences.id->experience_pricing.experience_id, experiences.id->experience_addons.experience_id, experiences.id->experience_images.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id, experiences.id->reviews.experience_id",
  },
};

export const getExperienceDetails = _getExperienceDetails;

_listExperiences.metadata = {
  description: " Listar experiências (com filtros)",
  category: " experiences",
  inputModel: {
    categoryId: "category_123",
    locationId: "location_123",
    minDuration: 2,
    maxDuration: 6,
    minPrice: 50,
    maxPrice: 300,
    language: "Inglês",
    date: "2023-06-15",
    page: 1,
    limit: 10,
    sortBy: "price", // 'price', 'duration', 'rating'
    sortOrder: "asc", // 'asc', 'desc'
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), experience_pricing(SELECT), experience_categories(SELECT), guides(SELECT), locations(SELECT), categories(SELECT), reviews(SELECT)",
    dbProcedures: "sp_list_experiences",
    dbRelations:
      "experiences.guide_id->guides.id, experiences.location_id->locations.id, experiences.id->experience_pricing.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->reviews.experience_id",
  },
};

export const listExperiences = _listExperiences;

_translateExperience.metadata = {
  description: " Traduzir experiência para outro idioma",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    languageCode: "es",
    translations: {
      title: "Título en Español",
      shortDescription: "Breve descripción",
      fullDescription: "Descripción completa...",
      servicesIncluded: ["Transporte", "Merienda"],
      servicesNotIncluded: ["Bebidas alcohólicas"],
      meetingPoint: "Punto de encuentro",
    },
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT,INSERT), experience_translations(INSERT), itinerary_items(SELECT), itinerary_item_translations(INSERT)",
    dbProcedures: "sp_translate_experience",
    dbRelations:
      "experiences.id->experience_translations.experience_id, experiences.id->itinerary_items.experience_id, itinerary_items.id->itinerary_item_translations.item_id",
  },
};

export const translateExperience = _translateExperience;

_updateExperience.metadata = {
  description: " Atualizar experiência existente",
  category: " experiences",
  inputModel: {
    experience_id: "301f580d-d70a-44db-84a4-d6a6fd9dca85",
    // Informações Básicas
    title: "Passeio de Barco em Cancun",
    description:
      "Uma experiência incrível de passeio de barco pelas águas cristalinas de Cancun",
    duration_minutes: 180,
    min_participants: 1,
    max_participants: 10,
    max_adults: 6,
    max_teens: 2,
    max_children: 2,

    // Itinerário
    itinerary: [
      {
        order: 1,
        title: "Ponto de encontro",
        description: "Encontro no píer principal",
        duration_minutes: 15,
      },
      {
        order: 2,
        title: "Passeio de barco",
        description: "Navegação pelas águas cristalinas",
        duration_minutes: 120,
      },
      {
        order: 3,
        title: "Retorno",
        description: "Retorno ao píer principal",
        duration_minutes: 45,
      },
    ],

    // Preços
    price_tiers: [
      {
        min_people: 1,
        max_people: 2,
        adult_price: 100,
        teen_price: 90,
        child_price: 80,
      },
      {
        min_people: 3,
        max_people: 6,
        adult_price: 80,
        teen_price: 70,
        child_price: 60,
      },
      {
        min_people: 7,
        max_people: 10,
        adult_price: 60,
        teen_price: 50,
        child_price: 0,
      },
    ],

    // Mídia (URLs do Cloudinary)
    cover_image: "[File]",
    gallery_images: ["[File]"],

    // Horários de trabalho
    working_hours: [
      { day_of_week: 0, start_time: "09:00:00", end_time: "17:00:00" }, // Domingo
      { day_of_week: 1, start_time: "09:00:00", end_time: "17:00:00" }, // Segunda
      { day_of_week: 5, start_time: "10:00:00", end_time: "18:00:00" }, // Sexta
    ],

    // Tags (apenas IDs)
    tag_ids: [
      "c258e2f7-f580-48ba-abe8-2221a6e9f4f4", // Cancun (city)
      "05977ef3-1b67-46c4-9135-37e0b88d9404", // Passeio de barco (activity)
      "ac67afb2-bbc9-4c8d-bc5c-7092f253f18a", // Água e lanches (service_included)
      "71ce1e06-12b9-46ca-89ec-aaf2c6d030be", // Transporte (service_not_included)
      "f0e2b081-7c25-4f4b-bea4-fecc919f8acf", // Saber nadar (requisitos_especiais)
    ],

    // Política de cancelamento (ID)
    cancellation_policy_id: "949d0e46-62fd-49e9-a074-e307cfd719d5",
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT,UPDATE), experience_categories(DELETE,INSERT), experience_languages(DELETE,INSERT), experience_included_items(DELETE,INSERT), experience_excluded_items(DELETE,INSERT), locations(SELECT), categories(SELECT)",
    dbProcedures: "sp_update_experience",
    dbRelations:
      "experiences.location_id->locations.id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id, experiences.id->experience_languages.experience_id, experiences.id->experience_included_items.experience_id, experiences.id->experience_excluded_items.experience_id",
  },
};

export const updateExperience = _updateExperience;

_updateExperienceStatus.metadata = {
  description: " Ativar/desativar experiência",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    isActive: true,
    reason: "Retomando operação após temporada",
  },

  supabaseInfos: {
    dbTables: "experiences(SELECT,UPDATE), experience_status_history(INSERT)",
    dbProcedures: "sp_update_experience_status",
    dbRelations: "experiences.id->experience_status_history.experience_id",
  },
};

export const updateExperienceStatus = _updateExperienceStatus;

_updateItineraryItem.metadata = {
  description: " Atualizar item do itinerário",
  category: " experiences",
  inputModel: {
    itemId: "item_123",
    title: "Visita ao Museu Atualizada",
    description: "Visita guiada ao museu histórico com exposição especial",
    startTime: "10:30",
    duration: 120, // minutos
    orderNum: 3,
  },

  supabaseInfos: {
    dbTables: "itinerary_items(SELECT,UPDATE), experiences(SELECT)",
    dbProcedures: "sp_update_itinerary_item",
    dbRelations: "itinerary_items.experience_id->experiences.id",
  },
};

export const updateItineraryItem = _updateItineraryItem;

_updatePricing.metadata = {
  description: " Atualizar preços da experiência",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    pricingTiers: [
      {
        id: "tier_123", // Se for atualização
        minParticipants: 1,
        maxParticipants: 3,
        adultPrice: 180,
        teenagerPrice: 120,
        childPrice: 90,
      },
      {
        minParticipants: 4,
        maxParticipants: 8,
        adultPrice: 150,
        teenagerPrice: 100,
        childPrice: 75,
      },
    ],
  },

  supabaseInfos: {
    dbTables:
      "experience_pricing(SELECT,UPDATE), experience_addons(DELETE,INSERT), experiences(SELECT)",
    dbProcedures: "sp_update_experience_pricing",
    dbRelations:
      "experience_pricing.experience_id->experiences.id, experiences.id->experience_addons.experience_id",
  },
};

export const updatePricing = _updatePricing;

_uploadExperienceImages.metadata = {
  description: " Enviar imagens da experiência",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    coverImage: [File], // Arquivo de upload para capa
    galleryImages: [File, File, File], // Arquivos de upload para galeria
    descriptions: {
      "image1.jpg": "Descrição da imagem 1",
      "image2.jpg": "Descrição da imagem 2",
    },
  },

  supabaseInfos: {
    dbTables: "experiences(SELECT,UPDATE), experience_images(INSERT)",
    dbProcedures: "sp_upload_experience_images",
    dbRelations: "experiences.id->experience_images.experience_id",
  },
};

export const uploadExperienceImages = _uploadExperienceImages;

_completeOnboarding.metadata = {
  description: " Finalizar processo de onboarding",
  category: " guides",
  inputModel: {
    step: 3,
    data: {
      // Dados específicos do passo
    },
  },

  supabaseInfos: {
    dbTables: "guides(SELECT,UPDATE), guide_onboarding(INSERT,UPDATE)",
    dbProcedures: "sp_complete_guide_onboarding",
    dbRelations: "guides.id->guide_onboarding.guide_id",
  },
};

export const completeOnboarding = _completeOnboarding;

_getGuideDetails.metadata = {
  description: " Obter detalhes de um guia || OK",
  category: " guides",
  inputModel: { guideId: "guide_123" },

  supabaseInfos: {
    dbTables:
      "guides(SELECT), guide_languages(SELECT), guide_specialties(SELECT), guide_certifications(SELECT), users(SELECT), profiles(SELECT), experiences(SELECT), reviews(SELECT)",
    dbProcedures: "sp_get_guide_details",
    dbRelations:
      "guides.user_id->users.id, users.id->profiles.user_id, guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id, guides.id->guide_certifications.guide_id, guides.id->experiences.guide_id, guides.id->reviews.guide_id",
  },
};

export const getGuideDetails = _getGuideDetails;

_getGuideStats.metadata = {
  description: " Obter estatísticas do guia (reservas, avaliações)",
  category: " guides",
  inputModel: {
    guideId: "guide_123",
    period: "month", // 'week', 'month', 'year'
  },

  supabaseInfos: {
    dbTables:
      "guides(SELECT), bookings(SELECT), experiences(SELECT), reviews(SELECT), payments(SELECT)",
    dbProcedures: "sp_get_guide_stats",
    dbRelations:
      "guides.id->experiences.guide_id, experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, bookings.id->payments.booking_id",
  },
};

export const getGuideStats = _getGuideStats;

_listGuides.metadata = {
  description: " Listar guias (com filtros) || OK",
  category: " guides",
  inputModel: {
    location: "São Paulo",
    specialty: "História",
    language: "Inglês",
    page: 1,
    limit: 10,
  },

  supabaseInfos: {
    dbTables:
      "guides(SELECT), users(SELECT), profiles(SELECT), guide_languages(SELECT), guide_specialties(SELECT), experiences(SELECT), locations(SELECT), reviews(SELECT)",
    dbProcedures: "sp_list_guides",
    dbRelations:
      "guides.user_id->users.id, users.id->profiles.user_id, guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id, guides.id->experiences.guide_id, experiences.location_id->locations.id, guides.id->reviews.guide_id",
  },
};

export const listGuides = _listGuides;

_updateCommissionRate.metadata = {
  description: " Atualizar taxa de comissão (admin)",
  category: " guides",
  inputModel: { guideId: "guide_123", commissionRate: 75 },

  supabaseInfos: {
    dbTables: "guides(SELECT,UPDATE), commission_history(INSERT)",
    dbProcedures: "sp_update_guide_commission",
    dbRelations: "guides.id->commission_history.guide_id",
  },
};

export const updateCommissionRate = _updateCommissionRate;

_updateGuideProfile.metadata = {
  description: "Atualizar perfil de guia || OK",
  category: " guides",
  inputModel: {
    // Informações Pessoais
    avatar: "[File]",
    fullName: "Nome Completo",
    city: "Cancun",
    state: "Quintana Roo",
    shortDescription: "Descrição curta do guia",
    fullDescription: "Descrição completa e detalhada do guia",

    // Informações Profissionais
    languages: [{ language: "Português", proficiency: "native" }],
    specialties: ["Mergulho", "Fotografia", "História"],
    certifications: [
      { name: "PADI Open Water", startYear: 2018, endYear: 2023 },
    ],
    education: [
      {
        institution: "UNAM",
        course: "Turismo",
        startYear: 2010,
        endYear: 2014,
      },
    ],
    workExperience: [
      {
        role: "Guia de Mergulho",
        company: "Dive Cancun",
        startDate: "2015-01",
        endDate: "2020-12",
      },
    ],
    academicExperience: {
      title: "Professor de História",
      place: "Universidade de Cancun",
      date: "2016-2018",
    },

    // Mídia
    photos: ["[File]"],
    youtubeVideos: ["https://youtube.com/watch?v=abc123"],

    // Configurações da Conta
    phone: "+5219981234567",
    stripeAccount: "acct_123456",
    commissionRate: 85,

    // Preferências de Notificação
    emailNotifications: {
      newBookings: true,
      newMessages: true,
      paymentsReceived: true,
      marketingPromotions: true,
    },
    smsNotifications: {
      newBookings: true,
      newMessages: true,
      paymentsReceived: true,
    },

    // Configurações de Privacidade
    profileVisibility: "public",
    dataSharing: true,

    // Preferências da Plataforma
    language: "en-US",
    currency: "USD",
    dateFormat: "DD/MM/YYYY",
  },

  supabaseInfos: {
    dbTables:
      "guides(SELECT,UPDATE), guide_languages(DELETE,INSERT), guide_specialties(DELETE,INSERT)",
    dbProcedures: "sp_update_guide_profile",
    dbRelations:
      "guides.id->guide_languages.guide_id, guides.id->guide_specialties.guide_id",
  },
};

export const updateGuideProfile = _updateGuideProfile;

_uploadCertifications.metadata = {
  description: " Enviar certificações",
  category: " guides",
  inputModel: {
    certificationName: "Nome da Certificação",
    issueDate: "2023-01-15",
    expiryDate: "2025-01-15",
    certificateFile: [File], // Arquivo de upload
  },

  supabaseInfos: {
    dbTables: "guides(SELECT), guide_certifications(INSERT)",
    dbProcedures: "sp_upload_guide_certifications",
    dbRelations: "guides.id->guide_certifications.guide_id",
  },
};

export const uploadCertifications = _uploadCertifications;

_verifyGuide.metadata = {
  description: " Verificar guia (admin)",
  category: " guides",
  inputModel: {
    guideId: "guide_123",
    verified: true,
    notes: "Documentação verificada",
  },

  supabaseInfos: {
    dbTables:
      "guides(SELECT,UPDATE), guide_verification_history(INSERT), notifications(INSERT)",
    dbProcedures: "sp_verify_guide",
    dbRelations:
      "guides.id->guide_verification_history.guide_id, guides.user_id->notifications.user_id",
  },
};

export const verifyGuide = _verifyGuide;

_enrollInMarketplaceExperience.metadata = {
  description: " Inscrever-se em um template",
  category: " marketplace",
  inputModel: {
    experience_id: "b3763ebf-9016-4403-8938-020c71da3398",
    max_adults: 5,
    max_teens: 3,
    max_children: 2,
    terms_itinerary_accepted: true,
    terms_schedule_accepted: true,
    terms_conditions_accepted: true,
    working_hours: [
      {
        day_of_week: 0,
        start_time: "09:00:00",
        end_time: "17:00:00",
      },
      {
        day_of_week: 1,
        start_time: "09:00:00",
        end_time: "17:00:00",
      },
      {
        day_of_week: 5,
        start_time: "10:00:00",
        end_time: "18:00:00",
      },
    ],
  },

  supabaseInfos: {
    dbTables:
      "template_enrollments(INSERT), experience_templates(SELECT), guides(SELECT)",
    dbProcedures: "sp_enroll_in_template",
    dbRelations:
      "template_enrollments.template_id->experience_templates.id, template_enrollments.guide_id->guides.id",
  },
};

export const enrollInMarketplaceExperience = _enrollInMarketplaceExperience;

_getMarketplaceExperienceDetails.metadata = {
  description: " Obter detalhes de um Marketplace Experience",
  category: " marketplace",
  inputModel: {
    id: "b3763ebf-9016-4403-8938-020c71da3398", // ID da experiência do marketplace
  },

  supabaseInfos: {
    dbTables: "",
    dbProcedures: "",
    dbRelations: "",
  },
};

export const getMarketplaceExperienceDetails = _getMarketplaceExperienceDetails;

_listMarketplaceExperiences.metadata = {
  description: " Listar experiências do marketplace",
  category: " marketplace",
  inputModel: {
    // Todos os filtros são opcionais
    search: "mergulho", // Busca por nome/descrição
    enrolled: true,
    min_duration: 2, // Duração mínima em horas
    max_duration: 6, // Duração máxima em horas
    page: 1, // Página atual (para paginação)
    limit: 10, // Itens por página
  },

  supabaseInfos: {
    dbTables:
      "experience_templates(SELECT), template_pricing(SELECT), template_categories(SELECT), locations(SELECT), categories(SELECT)",
    dbProcedures: "sp_list_template_experiences",
    dbRelations:
      "experience_templates.location_id->locations.id, experience_templates.id->template_pricing.template_id, experience_templates.id->template_categories.template_id, template_categories.category_id->categories.id",
  },
};

export const listMarketplaceExperiences = _listMarketplaceExperiences;

_unenrollFromMarketplaceExperience.metadata = {
  description: " Cancelar inscrição em um template",
  category: " marketplace",
  inputModel: {
    experience_id: "b3763ebf-9016-4403-8938-020c71da3398", // ID da experiência do marketplace
  },

  supabaseInfos: {
    dbTables: "",
    dbProcedures: "",
    dbRelations: "",
  },
};

export const unenrollFromMarketplaceExperience =
  _unenrollFromMarketplaceExperience;

_getUnreadNotifications.metadata = {
  description: " Obter notificações não lidas",
  category: " notifications",
  inputModel: { userId: "user_123", limit: 20 },

  supabaseInfos: {
    dbTables: "notifications(SELECT), users(SELECT)",
    dbProcedures: "sp_get_unread_notifications",
    dbRelations: "notifications.user_id->users.id",
  },
};

export const getUnreadNotifications = _getUnreadNotifications;

_markNotificationAsRead.metadata = {
  description: " Marcar notificação como lida",
  category: " notifications",
  inputModel: { notificationId: "notification_123", userId: "user_123" },

  supabaseInfos: {
    dbTables: "notifications(SELECT,UPDATE)",
    dbProcedures: "sp_mark_notification_as_read",
    dbRelations: "notifications.user_id->users.id",
  },
};

export const markNotificationAsRead = _markNotificationAsRead;

_sendNotification.metadata = {
  description: " Enviar notificação",
  category: " notifications",
  inputModel: {
    userId: "user_123",
    type: "booking_confirmation", // 'booking_confirmation', 'message', 'review', etc.
    title: "Reserva Confirmada",
    message: "Sua reserva foi confirmada com sucesso!",
    data: {
      bookingId: "booking_123",
      experienceId: "exp_123",
    },
    channels: ["email", "push", "in_app"],
  },

  supabaseInfos: {
    dbTables: "notifications(INSERT), users(SELECT)",
    dbProcedures: "sp_send_notification",
    dbRelations: "notifications.user_id->users.id",
  },
};

export const sendNotification = _sendNotification;

_updateNotificationPreferences.metadata = {
  description: " Atualizar preferências de notificação",
  category: " notifications",
  inputModel: {
    userId: "user_123",
    preferences: {
      bookings: {
        email: true,
        push: true,
        in_app: true,
      },
      messages: {
        email: false,
        push: true,
        in_app: true,
      },
      marketing: {
        email: true,
        push: false,
        in_app: false,
      },
    },
  },

  supabaseInfos: {
    dbTables: "notification_preferences(SELECT,UPDATE), users(SELECT)",
    dbProcedures: "sp_update_notification_preferences",
    dbRelations: "notification_preferences.user_id->users.id",
  },
};

export const updateNotificationPreferences = _updateNotificationPreferences;

_approveQuotation.metadata = {
  description: " Aprovar cotação (turista)",
  category: " quotations",
  inputModel: {
    quotationId: "quotation_123",
    comments: "Aprovado conforme discutido",
  },

  supabaseInfos: {
    dbTables: "quotations(SELECT,UPDATE), notifications(INSERT)",
    dbProcedures: "sp_approve_quotation",
    dbRelations: "quotations.user_id->notifications.user_id",
  },
};

export const approveQuotation = _approveQuotation;

_convertToBooking.metadata = {
  description: " Converter cotação em reserva",
  category: " quotations",
  inputModel: {
    quotationId: "quotation_123",
    adultCount: 2,
    teenagerCount: 2,
    childCount: 0,
    touristName: "Nome do Turista",
    touristEmail: "turista@exemplo.com",
    touristPhone: "11999999999",
    hotel: "Hotel Central",
    specialRequests: "Pedidos especiais para a reserva",
  },

  supabaseInfos: {
    dbTables:
      "quotations(SELECT,UPDATE), bookings(INSERT), booking_addons(INSERT)",
    dbProcedures: "sp_convert_quotation_to_booking",
    dbRelations:
      "quotations.experience_id->bookings.experience_id, quotations.user_id->bookings.user_id, bookings.id->booking_addons.booking_id",
  },
};

export const convertToBooking = _convertToBooking;

_createQuotation.metadata = {
  description: " Criar nova cotação",
  category: " quotations",
  inputModel: {
    chatId: "chat_123",
    guideId: "guide_123",
    touristId: "tourist_123",
    title: "Tour Personalizado",
    description: "Tour personalizado para família de 4 pessoas",
    itinerary: "Visita aos principais pontos turísticos",
    date: "2023-08-10",
    duration: 6, // horas
    peopleCount: 4,
    price: 600,
    meetingPoint: "Hotel do turista",
    inclusions: ["Transporte", "Guia", "Água"],
    exclusions: ["Refeições", "Ingressos"],
  },

  supabaseInfos: {
    dbTables:
      "quotations(INSERT), quotation_addons(INSERT), experiences(SELECT), guides(SELECT)",
    dbProcedures: "sp_create_quotation",
    dbRelations:
      "quotations.experience_id->experiences.id, experiences.guide_id->guides.id, quotations.id->quotation_addons.quotation_id",
  },
};

export const createQuotation = _createQuotation;

_getQuotationDetails.metadata = {
  description: " Obter detalhes de uma cotação",
  category: " quotations",
  inputModel: { quotationId: "quotation_123" },

  supabaseInfos: {
    dbTables:
      "quotations(SELECT), quotation_addons(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)",
    dbProcedures: "sp_get_quotation_details",
    dbRelations:
      "quotations.experience_id->experiences.id, quotations.user_id->users.id, experiences.guide_id->guides.id, quotations.id->quotation_addons.quotation_id",
  },
};

export const getQuotationDetails = _getQuotationDetails;

_listQuotations.metadata = {
  description: " Listar cotações",
  category: " quotations",
  inputModel: {
    userId: "user_123",
    userType: "guide", // 'tourist' ou 'guide'
    status: "pending", // 'pending', 'approved', 'rejected', 'paid'
    page: 1,
    limit: 10,
  },

  supabaseInfos: {
    dbTables:
      "quotations(SELECT), experiences(SELECT), users(SELECT), guides(SELECT)",
    dbProcedures: "sp_list_quotations",
    dbRelations:
      "quotations.experience_id->experiences.id, quotations.user_id->users.id, experiences.guide_id->guides.id",
  },
};

export const listQuotations = _listQuotations;

_rejectQuotation.metadata = {
  description: " Rejeitar cotação (turista)",
  category: " quotations",
  inputModel: {
    quotationId: "quotation_123",
    reason: "Preço acima do orçamento",
    requestNewQuote: true,
  },

  supabaseInfos: {
    dbTables: "quotations(SELECT,UPDATE), notifications(INSERT)",
    dbProcedures: "sp_reject_quotation",
    dbRelations: "quotations.user_id->notifications.user_id",
  },
};

export const rejectQuotation = _rejectQuotation;

_updateQuotation.metadata = {
  description: " Atualizar cotação",
  category: " quotations",
  inputModel: {
    quotationId: "quotation_123",
    title: "Tour Personalizado Atualizado",
    description: "Descrição atualizada",
    itinerary: "Itinerário atualizado",
    date: "2023-08-15",
    duration: 7,
    peopleCount: 5,
    price: 700,
    meetingPoint: "Novo ponto de encontro",
    inclusions: ["Transporte", "Guia", "Água", "Lanche"],
    exclusions: ["Refeições principais", "Ingressos"],
  },

  supabaseInfos: {
    dbTables: "quotations(SELECT,UPDATE), quotation_history(INSERT)",
    dbProcedures: "sp_update_quotation",
    dbRelations: "quotations.id->quotation_history.quotation_id",
  },
};

export const updateQuotation = _updateQuotation;

_exportData.metadata = {
  description: " Exportar dados para CSV/Excel",
  category: " reports",
  inputModel: {
    dataType: "bookings", // 'bookings', 'users', 'experiences', 'reviews'
    filters: {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "completed",
    },
    format: "csv", // 'csv', 'excel', 'json'
    includeFields: ["id", "date", "tourist", "guide", "experience", "price"],
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT), reviews(SELECT)",
    dbProcedures: "sp_export_data",
    dbRelations:
      "bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->payments.booking_id, experiences.id->reviews.experience_id",
  },
};

export const exportData = _exportData;

_getBookingReport.metadata = {
  description: " Relatório de reservas",
  category: " reports",
  inputModel: {
    period: "month", // 'day', 'week', 'month', 'year'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    guideId: "guide_123", // Opcional
    locationId: "location_123", // Opcional
    format: "json", // 'json', 'csv', 'excel'
  },

  supabaseInfos: {
    dbTables:
      "bookings(SELECT), experiences(SELECT), users(SELECT), guides(SELECT), payments(SELECT)",
    dbProcedures: "sp_get_booking_report",
    dbRelations:
      "bookings.experience_id->experiences.id, bookings.user_id->users.id, experiences.guide_id->guides.id, bookings.id->payments.booking_id",
  },
};

export const getBookingReport = _getBookingReport;

_getExperiencePerformanceReport.metadata = {
  description: " Relatório de desempenho de experiências",
  category: " reports",
  inputModel: {
    experienceId: "exp_123", // Opcional
    categoryId: "category_123", // Opcional
    period: "month", // 'day', 'week', 'month', 'year'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    metrics: ["bookings", "revenue", "ratings", "views"],
    format: "json", // 'json', 'csv', 'excel'
  },

  supabaseInfos: {
    dbTables:
      "experiences(SELECT), bookings(SELECT), reviews(SELECT), experience_categories(SELECT), categories(SELECT)",
    dbProcedures: "sp_get_experience_performance_report",
    dbRelations:
      "experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, experiences.id->experience_categories.experience_id, experience_categories.category_id->categories.id",
  },
};

export const getExperiencePerformanceReport = _getExperiencePerformanceReport;

_getGuidePerformanceReport.metadata = {
  description: " Relatório de desempenho de guias",
  category: " reports",
  inputModel: {
    guideId: "guide_123",
    period: "month", // 'day', 'week', 'month', 'year'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    metrics: ["bookings", "revenue", "ratings", "response_time"],
    format: "json", // 'json', 'csv', 'excel'
  },

  supabaseInfos: {
    dbTables:
      "guides(SELECT), experiences(SELECT), bookings(SELECT), reviews(SELECT), payments(SELECT)",
    dbProcedures: "sp_get_guide_performance_report",
    dbRelations:
      "guides.id->experiences.guide_id, experiences.id->bookings.experience_id, experiences.id->reviews.experience_id, bookings.id->payments.booking_id",
  },
};

export const getGuidePerformanceReport = _getGuidePerformanceReport;

_getRevenueReport.metadata = {
  description: " Relatório de receita",
  category: " reports",
  inputModel: {
    period: "month", // 'day', 'week', 'month', 'year'
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    guideId: "guide_123", // Opcional
    categoryId: "category_123", // Opcional
    groupBy: "guide", // 'guide', 'experience', 'category', 'location'
    format: "json", // 'json', 'csv', 'excel'
  },

  supabaseInfos: {
    dbTables:
      "payments(SELECT), bookings(SELECT), experiences(SELECT), guides(SELECT)",
    dbProcedures: "sp_get_revenue_report",
    dbRelations:
      "payments.booking_id->bookings.id, bookings.experience_id->experiences.id, experiences.guide_id->guides.id",
  },
};

export const getRevenueReport = _getRevenueReport;

_createReview.metadata = {
  description: " Criar avaliação || OK",
  category: " reviews",
  inputModel: {
    bookingId: "booking_123",
    experienceId: "exp_123",
    guideId: "guide_123",
    rating: 5,
    comment: "Experiência incrível! O guia foi muito atencioso e conhecedor.",
  },

  supabaseInfos: {
    dbTables:
      "reviews(INSERT), review_attributes(INSERT), bookings(SELECT), experiences(SELECT), guides(SELECT)",
    dbProcedures: "sp_create_review",
    dbRelations:
      "reviews.experience_id->experiences.id, reviews.booking_id->bookings.id, reviews.guide_id->guides.id, reviews.id->review_attributes.review_id",
  },
};

export const createReview = _createReview;

_deleteReview.metadata = {
  description: " Excluir avaliação",
  category: " reviews",
  inputModel: { reviewId: "review_123", reason: "Informações incorretas" },

  supabaseInfos: {
    dbTables: "reviews(SELECT,UPDATE), review_attributes(UPDATE)",
    dbProcedures: "sp_delete_review",
    dbRelations: "reviews.id->review_attributes.review_id",
  },
};

export const deleteReview = _deleteReview;

_getReviewStats.metadata = {
  description: " Obter estatísticas de avaliações",
  category: " reviews",
  inputModel: {
    type: "guide", // 'guide' ou 'experience'
    id: "guide_123", // ID do guia ou experiência
  },

  supabaseInfos: {
    dbTables:
      "reviews(SELECT), review_attributes(SELECT), experiences(SELECT), guides(SELECT)",
    dbProcedures: "sp_get_review_stats",
    dbRelations:
      "reviews.experience_id->experiences.id, reviews.guide_id->guides.id, reviews.id->review_attributes.review_id",
  },
};

export const getReviewStats = _getReviewStats;

_listReviews.metadata = {
  description: " Listar avaliações (por guia ou experiência)",
  category: " reviews",
  inputModel: {
    type: "guide", // 'guide' ou 'experience'
    id: "guide_123", // ID do guia ou experiência
    sortBy: "date", // 'date', 'rating'
    sortOrder: "desc", // 'asc', 'desc'
    page: 1,
    limit: 10,
  },

  supabaseInfos: {
    dbTables:
      "reviews(SELECT), review_attributes(SELECT), experiences(SELECT), guides(SELECT), users(SELECT)",
    dbProcedures: "sp_list_reviews",
    dbRelations:
      "reviews.experience_id->experiences.id, reviews.guide_id->guides.id, reviews.user_id->users.id, reviews.id->review_attributes.review_id",
  },
};

export const listReviews = _listReviews;

_updateReview.metadata = {
  description: " Atualizar avaliação",
  category: " reviews",
  inputModel: {
    reviewId: "review_123",
    rating: 4,
    comment: "Experiência muito boa, mas poderia melhorar em alguns aspectos.",
  },

  supabaseInfos: {
    dbTables: "reviews(SELECT,UPDATE), review_attributes(DELETE,INSERT)",
    dbProcedures: "sp_update_review",
    dbRelations: "reviews.id->review_attributes.review_id",
  },
};

export const updateReview = _updateReview;

_deleteImage.metadata = {
  description: " Excluir imagem",
  category: " utils",
  inputModel: {
    url: "https://exemplo.com/imagem.jpg",
    folder: "experiences",
    id: "exp_123",
  },

  supabaseInfos: {
    dbTables:
      "experience_images(SELECT,DELETE), blog_images(SELECT,DELETE), guide_certifications(SELECT,DELETE)",
    dbProcedures: "sp_delete_image",
    dbRelations:
      "experience_images.experience_id->experiences.id, blog_images.post_id->blog_posts.id, guide_certifications.guide_id->guides.id",
  },
};

export const deleteImage = _deleteImage;

_generateSlug.metadata = {
  description: " Gerar slug para URLs",
  category: " utils",
  inputModel: {
    text: "Título do Post ou Experiência",
    type: "experience", // 'experience', 'blog', etc.
  },

  supabaseInfos: {
    dbTables: "experiences(SELECT), blog_posts(SELECT)",
    dbProcedures: "sp_generate_slug",
    dbRelations: "null",
  },
};

export const generateSlug = _generateSlug;

_getLocationCoordinates.metadata = {
  description: " Obter coordenadas de um local",
  category: " utils",
  inputModel: { address: "Av. Paulista, 1000, São Paulo, SP, Brasil" },

  supabaseInfos: {
    dbTables: "locations(SELECT,INSERT)",
    dbProcedures: "sp_get_location_coordinates",
    dbRelations: "null",
  },
};

export const getLocationCoordinates = _getLocationCoordinates;

_translateText.metadata = {
  description: " Traduzir texto",
  category: " utils",
  inputModel: {
    text: "Texto para traduzir",
    sourceLanguage: "pt",
    targetLanguage: "en",
  },

  supabaseInfos: {
    dbTables: "translation_cache(SELECT,INSERT)",
    dbProcedures: "sp_translate_text",
    dbRelations: "null",
  },
};

export const translateText = _translateText;

_uploadImage.metadata = {
  description: " Enviar imagem (genérico)",
  category: " utils",
  inputModel: {
    file: [File],
    folder: "experiences", // 'experiences', 'guides', 'blog', etc.
    id: "exp_123", // ID relacionado
    type: "cover", // 'cover', 'gallery', 'profile', etc.
    metadata: {
      altText: "Texto alternativo",
      caption: "Legenda da imagem",
    },
  },

  supabaseInfos: {
    dbTables:
      "experience_images(INSERT), blog_images(INSERT), profiles(UPDATE)",
    dbProcedures: "sp_upload_image",
    dbRelations:
      "experience_images.experience_id->experiences.id, blog_images.post_id->blog_posts.id, profiles.user_id->users.id",
  },
};

export const uploadImage = _uploadImage;

_validateCoupon.metadata = {
  description: " Validar cupom de desconto",
  category: " utils",
  inputModel: {
    code: "DESCONTO20",
    experienceId: "exp_123",
    userId: "user_123",
  },

  supabaseInfos: {
    dbTables: "coupons(SELECT), coupon_usages(SELECT), experiences(SELECT)",
    dbProcedures: "sp_validate_coupon",
    dbRelations:
      "coupons.experience_id->experiences.id, coupons.id->coupon_usages.coupon_id",
  },
};

export const validateCoupon = _validateCoupon;
