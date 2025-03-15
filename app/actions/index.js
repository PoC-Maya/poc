/**
 * Arquivo de exportação de todas as Server Actions
 * Gerado automaticamente
 */
// No início do arquivo index.js
const isDev = process.env.NODE_ENV === 'development';
import { getAuditLogs as _getAuditLogs } from "./admin/getAuditLogs.js";
import { getDashboardStats as _getDashboardStats } from "./admin/getDashboardStats.js";
import { getSystemHealth as _getSystemHealth } from "./admin/getSystemHealth.js";
import { listUsers as _listUsers } from "./admin/listUsers.js";
import { manageCategories as _manageCategories } from "./admin/manageCategories.js";
import { manageLocations as _manageLocations } from "./admin/manageLocations.js";
import { updateUserStatus as _updateUserStatus } from "./admin/updateUserStatus.js";
import { changePassword as _changePassword } from "./auth/changePassword.js";
import { deleteAccount as _deleteAccount } from "./auth/deleteAccount.js";
import { login as _login } from "./auth/login.js";
import { logout as _logout } from "./auth/logout.js";
import { register as _register } from "./auth/register.js";
import { resetPassword as _resetPassword } from "./auth/resetPassword.js";
import { saveConsent as _saveConsent } from "./auth/saveConsent.js";
import { updatePreferences as _updatePreferences } from "./auth/updatePreferences.js";
import { updateProfile as _updateProfile } from "./auth/updateProfile.js";
import { addException as _addException } from "./availability/addException.js";
import { addTimeBlock as _addTimeBlock } from "./availability/addTimeBlock.js";
import { createAvailabilityTemplate as _createAvailabilityTemplate } from "./availability/createAvailabilityTemplate.js";
import { getAvailableDates as _getAvailableDates } from "./availability/getAvailableDates.js";
import { getAvailableTimes as _getAvailableTimes } from "./availability/getAvailableTimes.js";
import { removeException as _removeException } from "./availability/removeException.js";
import { removeTimeBlock as _removeTimeBlock } from "./availability/removeTimeBlock.js";
import { updateAvailabilityTemplate as _updateAvailabilityTemplate } from "./availability/updateAvailabilityTemplate.js";
import { createPost as _createPost } from "./blog/createPost.js";
import { deletePost as _deletePost } from "./blog/deletePost.js";
import { getPostDetails as _getPostDetails } from "./blog/getPostDetails.js";
import { listPosts as _listPosts } from "./blog/listPosts.js";
import { publishPost as _publishPost } from "./blog/publishPost.js";
import { unpublishPost as _unpublishPost } from "./blog/unpublishPost.js";
import { updatePost as _updatePost } from "./blog/updatePost.js";
import { uploadPostImage as _uploadPostImage } from "./blog/uploadPostImage.js";
import { calculateBookingPrice as _calculateBookingPrice } from "./bookings/calculateBookingPrice.js";
import { cancelBooking as _cancelBooking } from "./bookings/cancelBooking.js";
import { completeBooking as _completeBooking } from "./bookings/completeBooking.js";
import { confirmBooking as _confirmBooking } from "./bookings/confirmBooking.js";
import { createBooking as _createBooking } from "./bookings/createBooking.js";
import { getBookingDetails as _getBookingDetails } from "./bookings/getBookingDetails.js";
import { listBookings as _listBookings } from "./bookings/listBookings.js";
import { processPayment as _processPayment } from "./bookings/processPayment.js";
import { sendBookingConfirmation as _sendBookingConfirmation } from "./bookings/sendBookingConfirmation.js";
import { updateBooking as _updateBooking } from "./bookings/updateBooking.js";
import { createChat as _createChat } from "./chats/createChat.js";
import { getChatMessages as _getChatMessages } from "./chats/getChatMessages.js";
import { listChats as _listChats } from "./chats/listChats.js";
import { markAsRead as _markAsRead } from "./chats/markAsRead.js";
import { sendMessage as _sendMessage } from "./chats/sendMessage.js";
import { addItineraryItem as _addItineraryItem } from "./experiences/addItineraryItem.js";
import { cloneExperience as _cloneExperience } from "./experiences/cloneExperience.js";
import { createCustomExperience as _createCustomExperience } from "./experiences/createCustomExperience.js";
import { createExperience as _createExperience } from "./experiences/createExperience.js";
import { deleteExperience as _deleteExperience } from "./experiences/deleteExperience.js";
import { deleteItineraryItem as _deleteItineraryItem } from "./experiences/deleteItineraryItem.js";
import { getExperienceDetails as _getExperienceDetails } from "./experiences/getExperienceDetails.js";
import { listExperiences as _listExperiences } from "./experiences/listExperiences.js";
import { translateExperience as _translateExperience } from "./experiences/translateExperience.js";
import { updateExperience as _updateExperience } from "./experiences/updateExperience.js";
import { updateExperienceStatus as _updateExperienceStatus } from "./experiences/updateExperienceStatus.js";
import { updateItineraryItem as _updateItineraryItem } from "./experiences/updateItineraryItem.js";
import { updatePricing as _updatePricing } from "./experiences/updatePricing.js";
import { uploadExperienceImages as _uploadExperienceImages } from "./experiences/uploadExperienceImages.js";
import { completeOnboarding as _completeOnboarding } from "./guides/completeOnboarding.js";
import { createGuideProfile as _createGuideProfile } from "./guides/createGuideProfile.js";
import { getGuideDetails as _getGuideDetails } from "./guides/getGuideDetails.js";
import { getGuideStats as _getGuideStats } from "./guides/getGuideStats.js";
import { listGuides as _listGuides } from "./guides/listGuides.js";
import { updateCommissionRate as _updateCommissionRate } from "./guides/updateCommissionRate.js";
import { updateGuideProfile as _updateGuideProfile } from "./guides/updateGuideProfile.js";
import { uploadCertifications as _uploadCertifications } from "./guides/uploadCertifications.js";
import { verifyGuide as _verifyGuide } from "./guides/verifyGuide.js";
import { enrollInTemplate as _enrollInTemplate } from "./marketplace/enrollInTemplate.js";
import { getTemplateDetails as _getTemplateDetails } from "./marketplace/getTemplateDetails.js";
import { listEnrolledTemplates as _listEnrolledTemplates } from "./marketplace/listEnrolledTemplates.js";
import { listTemplateExperiences as _listTemplateExperiences } from "./marketplace/listTemplateExperiences.js";
import { unenrollFromTemplate as _unenrollFromTemplate } from "./marketplace/unenrollFromTemplate.js";
import { getUnreadNotifications as _getUnreadNotifications } from "./notifications/getUnreadNotifications.js";
import { markNotificationAsRead as _markNotificationAsRead } from "./notifications/markNotificationAsRead.js";
import { sendNotification as _sendNotification } from "./notifications/sendNotification.js";
import { updateNotificationPreferences as _updateNotificationPreferences } from "./notifications/updateNotificationPreferences.js";
import { approveQuotation as _approveQuotation } from "./quotations/approveQuotation.js";
import { convertToBooking as _convertToBooking } from "./quotations/convertToBooking.js";
import { createQuotation as _createQuotation } from "./quotations/createQuotation.js";
import { getQuotationDetails as _getQuotationDetails } from "./quotations/getQuotationDetails.js";
import { listQuotations as _listQuotations } from "./quotations/listQuotations.js";
import { rejectQuotation as _rejectQuotation } from "./quotations/rejectQuotation.js";
import { updateQuotation as _updateQuotation } from "./quotations/updateQuotation.js";
import { exportData as _exportData } from "./reports/exportData.js";
import { getBookingReport as _getBookingReport } from "./reports/getBookingReport.js";
import { getExperiencePerformanceReport as _getExperiencePerformanceReport } from "./reports/getExperiencePerformanceReport.js";
import { getGuidePerformanceReport as _getGuidePerformanceReport } from "./reports/getGuidePerformanceReport.js";
import { getRevenueReport as _getRevenueReport } from "./reports/getRevenueReport.js";
import { createReview as _createReview } from "./reviews/createReview.js";
import { deleteReview as _deleteReview } from "./reviews/deleteReview.js";
import { getReviewStats as _getReviewStats } from "./reviews/getReviewStats.js";
import { listReviews as _listReviews } from "./reviews/listReviews.js";
import { updateReview as _updateReview } from "./reviews/updateReview.js";
import { deleteImage as _deleteImage } from "./utils/deleteImage.js";
import { generateSlug as _generateSlug } from "./utils/generateSlug.js";
import { getLocationCoordinates as _getLocationCoordinates } from "./utils/getLocationCoordinates.js";
import { translateText as _translateText } from "./utils/translateText.js";
import { uploadImage as _uploadImage } from "./utils/uploadImage.js";
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
};

export const getDashboardStats = _getDashboardStats;

_getSystemHealth.metadata = {
  description: " Verificar saúde do sistema",
  category: " admin",
  inputModel: { checkDatabase: true, checkStorage: true, checkPayments: true },
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
};

export const updateUserStatus = _updateUserStatus;

_changePassword.metadata = {
  description: " Alterar senha",
  category: " auth",
  inputModel: {
    currentPassword: "senhaAtual",
    newPassword: "novaSenha",
    confirmPassword: "novaSenha",
  },
};

export const changePassword = _changePassword;

_deleteAccount.metadata = {
  description: " Excluir conta (com anonimização)",
  category: " auth",
  inputModel: { password: "senha123", reason: "Motivo da exclusão" },
};

export const deleteAccount = _deleteAccount;

_login.metadata = {
  description: " Autenticar usuário",
  category: " auth",
  inputModel: { email: "usuario@exemplo.com", password: "senha123" },
};

export const login = _login;

_logout.metadata = {
  description: " Encerrar sessão do usuário",
  category: " auth",
  inputModel: {},
};

export const logout = _logout;

_register.metadata = {
  description: " Registrar novo usuário (turista ou guia)",
  category: " auth",
  inputModel: {
    email: "usuario@exemplo.com",
    password: "senha123",
    fullName: "Nome Completo",
    userType: "tourist", // ou 'guide'
  },
};

export const register = _register;

_resetPassword.metadata = {
  description: " Solicitar/confirmar redefinição de senha",
  category: " auth",
  inputModel: { email: "usuario@exemplo.com" },
};

export const resetPassword = _resetPassword;

_saveConsent.metadata = {
  description: " Salvar consentimentos LGPD",
  category: " auth",
  inputModel: { marketing: true, analytics: true, thirdParty: false },
};

export const saveConsent = _saveConsent;

_updatePreferences.metadata = {
  description: " Atualizar preferências (idioma, notificações)",
  category: " auth",
  inputModel: {
    language: "pt-BR",
    notifications: {
      email: true,
      push: false,
    },
  },
};

export const updatePreferences = _updatePreferences;

_updateProfile.metadata = {
  description: " Atualizar perfil do usuário",
  category: " auth",
  inputModel: {
    fullName: "Nome Atualizado",
    phone: "11999999999",
    bio: "Breve descrição sobre mim",
  },
};

export const updateProfile = _updateProfile;

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
};

export const addTimeBlock = _addTimeBlock;

_createAvailabilityTemplate.metadata = {
  description: " Criar template de disponibilidade",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    name: "Horário Padrão",
    isActive: true,
  },
};

export const createAvailabilityTemplate = _createAvailabilityTemplate;

_getAvailableDates.metadata = {
  description: " Obter datas disponíveis",
  category: " availability",
  inputModel: {
    guideId: "guide_123",
    experienceId: "exp_123",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
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
};

export const getAvailableTimes = _getAvailableTimes;

_removeException.metadata = {
  description: " Remover exceção de disponibilidade",
  category: " availability",
  inputModel: { exceptionId: "exception_123" },
};

export const removeException = _removeException;

_removeTimeBlock.metadata = {
  description: " Remover bloco de horário",
  category: " availability",
  inputModel: { blockId: "block_123" },
};

export const removeTimeBlock = _removeTimeBlock;

_updateAvailabilityTemplate.metadata = {
  description: " Atualizar template de disponibilidade",
  category: " availability",
  inputModel: {
    templateId: "template_123",
    name: "Horário de Verão",
    isActive: true,
  },
};

export const updateAvailabilityTemplate = _updateAvailabilityTemplate;

_createPost.metadata = {
  description: " Criar novo post",
  category: " blog",
  inputModel: {
    title: "Título do Post",
    content: "Conteúdo completo do post em formato markdown ou HTML",
    excerpt: "Breve resumo do post",
    coverImage: [File], // Arquivo de upload
    authorId: "author_123",
    category: "Dicas de Viagem",
    tags: ["viagem", "dicas", "turismo"],
    published: false,
  },
};

export const createPost = _createPost;

_deletePost.metadata = {
  description: " Excluir post",
  category: " blog",
  inputModel: { postId: "post_123" },
};

export const deletePost = _deletePost;

_getPostDetails.metadata = {
  description: " Obter detalhes de um post",
  category: " blog",
  inputModel: { slug: "titulo-do-post" },
};

export const getPostDetails = _getPostDetails;

_listPosts.metadata = {
  description: " Listar posts",
  category: " blog",
  inputModel: {
    category: "Dicas de Viagem",
    tag: "viagem",
    authorId: "author_123",
    published: true,
    page: 1,
    limit: 10,
    sortBy: "date", // 'date', 'title', 'popularity'
    sortOrder: "desc", // 'asc', 'desc'
  },
};

export const listPosts = _listPosts;

_publishPost.metadata = {
  description: " Publicar post",
  category: " blog",
  inputModel: {
    postId: "post_123",
    scheduledDate: "2023-06-15T10:00:00Z", // Opcional, para agendamento
  },
};

export const publishPost = _publishPost;

_unpublishPost.metadata = {
  description: " Despublicar post",
  category: " blog",
  inputModel: { postId: "post_123", reason: "Conteúdo desatualizado" },
};

export const unpublishPost = _unpublishPost;

_updatePost.metadata = {
  description: " Atualizar post",
  category: " blog",
  inputModel: {
    postId: "post_123",
    title: "Título Atualizado",
    content: "Conteúdo atualizado",
    excerpt: "Novo resumo",
    coverImage: [File], // Opcional
    category: "Nova Categoria",
    tags: ["novos", "tags"],
  },
};

export const updatePost = _updatePost;

_uploadPostImage.metadata = {
  description: " Enviar imagem para o post",
  category: " blog",
  inputModel: {
    postId: "post_123",
    image: [File],
    caption: "Legenda da imagem",
    altText: "Texto alternativo para acessibilidade",
  },
};

export const uploadPostImage = _uploadPostImage;

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
};

export const cancelBooking = _cancelBooking;

_completeBooking.metadata = {
  description: " Marcar reserva como concluída",
  category: " bookings",
  inputModel: {
    bookingId: "booking_123",
    notes: "Experiência realizada com sucesso",
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
};

export const createBooking = _createBooking;

_getBookingDetails.metadata = {
  description: " Obter detalhes de uma reserva",
  category: " bookings",
  inputModel: { bookingId: "booking_123" },
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
};

export const createChat = _createChat;

_getChatMessages.metadata = {
  description: " Obter mensagens de uma conversa",
  category: " chats",
  inputModel: { chatId: "chat_123", page: 1, limit: 50 },
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
};

export const cloneExperience = _cloneExperience;

_createCustomExperience.metadata = {
  description: " Criar experiência personalizada",
  category: " experiences",
  inputModel: {
    title: "Experiência Personalizada",
    touristId: "tourist_123",
    baseExperienceId: "exp_123", // Opcional, se baseada em uma existente
    date: "2023-07-20",
    participants: {
      adults: 2,
      teenagers: 1,
      children: 0,
    },
    specialRequests: "Gostaria de incluir uma parada para almoço",
    duration: 6, // horas
    locationId: "location_123",
  },
};

export const createCustomExperience = _createCustomExperience;

_createExperience.metadata = {
  description: " Criar nova experiência",
  category: " experiences",
  inputModel: {
    title: "Título da Experiência",
    shortDescription: "Breve descrição",
    fullDescription: "Descrição completa...",
    duration: 3, // horas
    minCapacity: 1,
    maxCapacity: 10,
    categoryId: "category_123",
    locationId: "location_123",
    meetingPoint: "Ponto de encontro",
    meetingPointCoordinates: {
      latitude: -23.55052,
      longitude: -46.633308,
    },
    availableLanguages: ["Português", "Inglês"],
    servicesIncluded: ["Transporte", "Lanche"],
    servicesNotIncluded: ["Bebidas alcoólicas"],
    transportMode: "A pé",
    pricing: [
      {
        minParticipants: 1,
        maxParticipants: 3,
        adultPrice: 150,
        childPrice: 75,
      },
    ],
  },
};

export const createExperience = _createExperience;

_deleteExperience.metadata = {
  description: " Excluir experiência",
  category: " experiences",
  inputModel: { experienceId: "exp_123", reason: "Experiência descontinuada" },
};

export const deleteExperience = _deleteExperience;

_deleteItineraryItem.metadata = {
  description: " Remover item do itinerário",
  category: " experiences",
  inputModel: { itemId: "item_123" },
};

export const deleteItineraryItem = _deleteItineraryItem;

_getExperienceDetails.metadata = {
  description: " Obter detalhes de uma experiência",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    language: "pt-BR", // Idioma para tradução, se disponível
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
};

export const translateExperience = _translateExperience;

_updateExperience.metadata = {
  description: " Atualizar experiência existente",
  category: " experiences",
  inputModel: {
    experienceId: "exp_123",
    title: "Título Atualizado",
    shortDescription: "Nova descrição breve",
    fullDescription: "Nova descrição completa...",
    duration: 4, // horas
    minCapacity: 2,
    maxCapacity: 12,
    categoryId: "category_456",
    locationId: "location_456",
    meetingPoint: "Novo ponto de encontro",
    meetingPointCoordinates: {
      latitude: -23.55052,
      longitude: -46.633308,
    },
    availableLanguages: ["Português", "Inglês", "Espanhol"],
    servicesIncluded: ["Transporte", "Lanche", "Guia"],
    servicesNotIncluded: ["Bebidas alcoólicas", "Gorjetas"],
    transportMode: "Van",
    isActive: true,
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
};

export const completeOnboarding = _completeOnboarding;

_createGuideProfile.metadata = {
  description: " Criar perfil de guia (após registro)",
  category: " guides",
  inputModel: {
    bio: "Biografia do guia",
    location: "São Paulo, Brasil",
    experienceYears: 5,
    languages: ["Português", "Inglês", "Espanhol"],
    specialties: ["História", "Gastronomia"],
    certifications: ["Guia de Turismo MTur"],
  },
};

export const createGuideProfile = _createGuideProfile;

_getGuideDetails.metadata = {
  description: " Obter detalhes de um guia",
  category: " guides",
  inputModel: { guideId: "guide_123" },
};

export const getGuideDetails = _getGuideDetails;

_getGuideStats.metadata = {
  description: " Obter estatísticas do guia (reservas, avaliações)",
  category: " guides",
  inputModel: {
    guideId: "guide_123",
    period: "month", // 'week', 'month', 'year'
  },
};

export const getGuideStats = _getGuideStats;

_listGuides.metadata = {
  description: " Listar guias (com filtros)",
  category: " guides",
  inputModel: {
    location: "São Paulo",
    specialty: "História",
    language: "Inglês",
    page: 1,
    limit: 10,
  },
};

export const listGuides = _listGuides;

_updateCommissionRate.metadata = {
  description: " Atualizar taxa de comissão (admin)",
  category: " guides",
  inputModel: { guideId: "guide_123", commissionRate: 75 },
};

export const updateCommissionRate = _updateCommissionRate;

_updateGuideProfile.metadata = {
  description: " Atualizar perfil de guia",
  category: " guides",
  inputModel: {
    bio: "Biografia atualizada",
    location: "Rio de Janeiro, Brasil",
    experienceYears: 6,
    languages: ["Português", "Inglês", "Francês"],
    specialties: ["História", "Aventura"],
    certifications: ["Guia de Turismo MTur", "Primeiros Socorros"],
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
};

export const verifyGuide = _verifyGuide;

_enrollInTemplate.metadata = {
  description: " Inscrever-se em um template",
  category: " marketplace",
  inputModel: {
    guideId: "guide_123",
    templateId: "template_123",
    customizations: {
      meetingPoint: "Ponto de encontro personalizado",
      price: 150, // Preço personalizado
    },
  },
};

export const enrollInTemplate = _enrollInTemplate;

_getTemplateDetails.metadata = {
  description: " Obter detalhes de um template",
  category: " marketplace",
  inputModel: { templateId: "template_123" },
};

export const getTemplateDetails = _getTemplateDetails;

_listEnrolledTemplates.metadata = {
  description: " Listar templates inscritos",
  category: " marketplace",
  inputModel: { guideId: "guide_123", page: 1, limit: 10 },
};

export const listEnrolledTemplates = _listEnrolledTemplates;

_listTemplateExperiences.metadata = {
  description: " Listar experiências do marketplace",
  category: " marketplace",
  inputModel: {
    category: "Aventura",
    location: "São Paulo",
    minDuration: 2,
    maxDuration: 8,
    page: 1,
    limit: 10,
  },
};

export const listTemplateExperiences = _listTemplateExperiences;

_unenrollFromTemplate.metadata = {
  description: " Cancelar inscrição em um template",
  category: " marketplace",
  inputModel: {
    guideId: "guide_123",
    templateId: "template_123",
    reason: "Não ofereço mais este tipo de experiência",
  },
};

export const unenrollFromTemplate = _unenrollFromTemplate;

_getUnreadNotifications.metadata = {
  description: " Obter notificações não lidas",
  category: " notifications",
  inputModel: { userId: "user_123", limit: 20 },
};

export const getUnreadNotifications = _getUnreadNotifications;

_markNotificationAsRead.metadata = {
  description: " Marcar notificação como lida",
  category: " notifications",
  inputModel: { notificationId: "notification_123", userId: "user_123" },
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
};

export const updateNotificationPreferences = _updateNotificationPreferences;

_approveQuotation.metadata = {
  description: " Aprovar cotação (turista)",
  category: " quotations",
  inputModel: {
    quotationId: "quotation_123",
    comments: "Aprovado conforme discutido",
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
};

export const createQuotation = _createQuotation;

_getQuotationDetails.metadata = {
  description: " Obter detalhes de uma cotação",
  category: " quotations",
  inputModel: { quotationId: "quotation_123" },
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
};

export const createReview = _createReview;

_deleteReview.metadata = {
  description: " Excluir avaliação",
  category: " reviews",
  inputModel: { reviewId: "review_123", reason: "Informações incorretas" },
};

export const deleteReview = _deleteReview;

_getReviewStats.metadata = {
  description: " Obter estatísticas de avaliações",
  category: " reviews",
  inputModel: {
    type: "guide", // 'guide' ou 'experience'
    id: "guide_123", // ID do guia ou experiência
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
};

export const deleteImage = _deleteImage;

_generateSlug.metadata = {
  description: " Gerar slug para URLs",
  category: " utils",
  inputModel: {
    text: "Título do Post ou Experiência",
    type: "experience", // 'experience', 'blog', etc.
  },
};

export const generateSlug = _generateSlug;

_getLocationCoordinates.metadata = {
  description: " Obter coordenadas de um local",
  category: " utils",
  inputModel: { address: "Av. Paulista, 1000, São Paulo, SP, Brasil" },
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
};

export const validateCoupon = _validateCoupon;
