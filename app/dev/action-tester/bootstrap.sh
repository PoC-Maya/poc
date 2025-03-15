#!/bin/bash

# Diretório base para as actions
BASE_DIR="./app/actions"

# Criar diretório base se não existir
mkdir -p $BASE_DIR

# Template aprimorado para Server Actions baseado no exemplo fornecido
create_action_file() {
    local file_path=$1
    local action_name=$(basename "$file_path" .js)
    local action_description=$2
    local input_model=$3
    local category=$(dirname "$file_path" | xargs basename)

cat > "$file_path" << EOF
'use server'

/**
 * @description $action_description
 * @category $category
 * @inputModel $input_model
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para validação
const schema = z.object({
  // Defina aqui o schema de validação específico para esta action
  // Exemplo:
  // name: z.string().min(3, "Nome muito curto").max(100),
  // email: z.string().email("Email inválido"),
});

export async function $action_name(prevState, formData) {
  try {
    // Pega o usuário autenticado e o perfil do usuário
    const { user, profile, supabase } = await requireAuth();

    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Validação dos dados do formulário  
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;

    // Implementar lógica específica da action aqui
    // Exemplo:
    // const { error } = await supabase
    //   .from("tabela")
    //   .update({
    //     campo1: data.campo1,
    //     campo2: data.campo2,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq("id", algumId);
    //
    // if (error) throw error;

    // Revalidar caminhos relevantes
    // revalidatePath('/caminho-relevante');
    
    return { 
      success: true,
      message: "$action_name executado com sucesso",
      // Dados adicionais que você queira retornar
    };

  } catch (error) {
    console.error("$action_name error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao executar $action_name. Tente novamente.",
      },
    };
  }
}
EOF
}

# Criar arquivo index.js para exportar todas as actions com descrições
# Função modificada para criar o arquivo index.js
create_index_file() {
    local index_path="$BASE_DIR/index.js"
    
    echo "/**" > "$index_path"
    echo " * Arquivo de exportação de todas as Server Actions" >> "$index_path"
    echo " * Gerado automaticamente" >> "$index_path"
    echo " */" >> "$index_path"
    
    # Encontrar todos os arquivos .js excluindo o index.js
    find "$BASE_DIR" -type f -name "*.js" ! -name "index.js" | sort | while read -r file; do
        local rel_path=${file#"$BASE_DIR/"}
        local action_name=$(basename "$file" .js)
        local dir_path=$(dirname "$rel_path")
        
        if [ "$dir_path" = "." ]; then
            echo "export { $action_name } from './$action_name';" >> "$index_path"
        else
            echo "export { $action_name } from './$rel_path';" >> "$index_path"
        fi
    done
}

# Definir estrutura de pastas e actions com descrições e modelos de entrada
declare -A actions
declare -A input_models

# Auth
input_models["auth/register"]="{
  email: 'usuario@exemplo.com',
  password: 'senha123',
  fullName: 'Nome Completo',
  userType: 'tourist' // ou 'guide'
}"
actions["auth/register"]="Registrar novo usuário (turista ou guia)"

input_models["auth/login"]="{
  email: 'usuario@exemplo.com',
  password: 'senha123'
}"
actions["auth/login"]="Autenticar usuário"

input_models["auth/logout"]="{}"
actions["auth/logout"]="Encerrar sessão do usuário"

input_models["auth/updateProfile"]="{
  fullName: 'Nome Atualizado',
  phone: '11999999999',
  bio: 'Breve descrição sobre mim'
}"
actions["auth/updateProfile"]="Atualizar perfil do usuário"

input_models["auth/changePassword"]="{
  currentPassword: 'senhaAtual',
  newPassword: 'novaSenha',
  confirmPassword: 'novaSenha'
}"
actions["auth/changePassword"]="Alterar senha"

input_models["auth/resetPassword"]="{
  email: 'usuario@exemplo.com'
}"
actions["auth/resetPassword"]="Solicitar/confirmar redefinição de senha"

input_models["auth/deleteAccount"]="{
  password: 'senha123',
  reason: 'Motivo da exclusão'
}"
actions["auth/deleteAccount"]="Excluir conta (com anonimização)"

input_models["auth/updatePreferences"]="{
  language: 'pt-BR',
  notifications: {
    email: true,
    push: false
  }
}"
actions["auth/updatePreferences"]="Atualizar preferências (idioma, notificações)"

input_models["auth/saveConsent"]="{
  marketing: true,
  analytics: true,
  thirdParty: false
}"
actions["auth/saveConsent"]="Salvar consentimentos LGPD"

# Guides
input_models["guides/createGuideProfile"]="{
  bio: 'Biografia do guia',
  location: 'São Paulo, Brasil',
  experienceYears: 5,
  languages: ['Português', 'Inglês', 'Espanhol'],
  specialties: ['História', 'Gastronomia'],
  certifications: ['Guia de Turismo MTur']
}"
actions["guides/createGuideProfile"]="Criar perfil de guia (após registro)"

input_models["guides/updateGuideProfile"]="{
  bio: 'Biografia atualizada',
  location: 'Rio de Janeiro, Brasil',
  experienceYears: 6,
  languages: ['Português', 'Inglês', 'Francês'],
  specialties: ['História', 'Aventura'],
  certifications: ['Guia de Turismo MTur', 'Primeiros Socorros']
}"
actions["guides/updateGuideProfile"]="Atualizar perfil de guia"

input_models["guides/uploadCertifications"]="{
  certificationName: 'Nome da Certificação',
  issueDate: '2023-01-15',
  expiryDate: '2025-01-15',
  certificateFile: [File] // Arquivo de upload
}"
actions["guides/uploadCertifications"]="Enviar certificações"

input_models["guides/updateCommissionRate"]="{
  guideId: 'guide_123',
  commissionRate: 75
}"
actions["guides/updateCommissionRate"]="Atualizar taxa de comissão (admin)"

input_models["guides/verifyGuide"]="{
  guideId: 'guide_123',
  verified: true,
  notes: 'Documentação verificada'
}"
actions["guides/verifyGuide"]="Verificar guia (admin)"

input_models["guides/listGuides"]="{
  location: 'São Paulo',
  specialty: 'História',
  language: 'Inglês',
  page: 1,
  limit: 10
}"
actions["guides/listGuides"]="Listar guias (com filtros)"

input_models["guides/getGuideDetails"]="{
  guideId: 'guide_123'
}"
actions["guides/getGuideDetails"]="Obter detalhes de um guia"

input_models["guides/getGuideStats"]="{
  guideId: 'guide_123',
  period: 'month' // 'week', 'month', 'year'
}"
actions["guides/getGuideStats"]="Obter estatísticas do guia (reservas, avaliações)"

input_models["guides/completeOnboarding"]="{
  step: 3,
  data: {
    // Dados específicos do passo
  }
}"
actions["guides/completeOnboarding"]="Finalizar processo de onboarding"

# Experiences
input_models["experiences/createExperience"]="{
  title: 'Título da Experiência',
  shortDescription: 'Breve descrição',
  fullDescription: 'Descrição completa...',
  duration: 3, // horas
  minCapacity: 1,
  maxCapacity: 10,
  categoryId: 'category_123',
  locationId: 'location_123',
  meetingPoint: 'Ponto de encontro',
  meetingPointCoordinates: {
    latitude: -23.550520,
    longitude: -46.633308
  },
  availableLanguages: ['Português', 'Inglês'],
  servicesIncluded: ['Transporte', 'Lanche'],
  servicesNotIncluded: ['Bebidas alcoólicas'],
  transportMode: 'A pé',
  pricing: [
    {
      minParticipants: 1,
      maxParticipants: 3,
      adultPrice: 150,
      childPrice: 75
    }
  ]
}"
actions["experiences/createExperience"]="Criar nova experiência"


# Experiences (continuação)
input_models["experiences/updateExperience"]="{
  experienceId: 'exp_123',
  title: 'Título Atualizado',
  shortDescription: 'Nova descrição breve',
  fullDescription: 'Nova descrição completa...',
  duration: 4, // horas
  minCapacity: 2,
  maxCapacity: 12,
  categoryId: 'category_456',
  locationId: 'location_456',
  meetingPoint: 'Novo ponto de encontro',
  meetingPointCoordinates: {
    latitude: -23.550520,
    longitude: -46.633308
  },
  availableLanguages: ['Português', 'Inglês', 'Espanhol'],
  servicesIncluded: ['Transporte', 'Lanche', 'Guia'],
  servicesNotIncluded: ['Bebidas alcoólicas', 'Gorjetas'],
  transportMode: 'Van',
  isActive: true
}"
actions["experiences/updateExperience"]="Atualizar experiência existente"

input_models["experiences/deleteExperience"]="{
  experienceId: 'exp_123',
  reason: 'Experiência descontinuada'
}"
actions["experiences/deleteExperience"]="Excluir experiência"

input_models["experiences/listExperiences"]="{
  categoryId: 'category_123',
  locationId: 'location_123',
  minDuration: 2,
  maxDuration: 6,
  minPrice: 50,
  maxPrice: 300,
  language: 'Inglês',
  date: '2023-06-15',
  page: 1,
  limit: 10,
  sortBy: 'price', // 'price', 'duration', 'rating'
  sortOrder: 'asc' // 'asc', 'desc'
}"
actions["experiences/listExperiences"]="Listar experiências (com filtros)"

input_models["experiences/getExperienceDetails"]="{
  experienceId: 'exp_123',
  language: 'pt-BR' // Idioma para tradução, se disponível
}"
actions["experiences/getExperienceDetails"]="Obter detalhes de uma experiência"

input_models["experiences/uploadExperienceImages"]="{
  experienceId: 'exp_123',
  coverImage: [File], // Arquivo de upload para capa
  galleryImages: [File, File, File], // Arquivos de upload para galeria
  descriptions: {
    'image1.jpg': 'Descrição da imagem 1',
    'image2.jpg': 'Descrição da imagem 2'
  }
}"
actions["experiences/uploadExperienceImages"]="Enviar imagens da experiência"

input_models["experiences/updateExperienceStatus"]="{
  experienceId: 'exp_123',
  isActive: true,
  reason: 'Retomando operação após temporada'
}"
actions["experiences/updateExperienceStatus"]="Ativar/desativar experiência"

input_models["experiences/addItineraryItem"]="{
  experienceId: 'exp_123',
  title: 'Visita ao Museu',
  description: 'Visita guiada ao museu histórico',
  startTime: '10:00',
  duration: 90, // minutos
  orderNum: 2
}"
actions["experiences/addItineraryItem"]="Adicionar item ao itinerário"

input_models["experiences/updateItineraryItem"]="{
  itemId: 'item_123',
  title: 'Visita ao Museu Atualizada',
  description: 'Visita guiada ao museu histórico com exposição especial',
  startTime: '10:30',
  duration: 120, // minutos
  orderNum: 3
}"
actions["experiences/updateItineraryItem"]="Atualizar item do itinerário"

input_models["experiences/deleteItineraryItem"]="{
  itemId: 'item_123'
}"
actions["experiences/deleteItineraryItem"]="Remover item do itinerário"

input_models["experiences/updatePricing"]="{
  experienceId: 'exp_123',
  pricingTiers: [
    {
      id: 'tier_123', // Se for atualização
      minParticipants: 1,
      maxParticipants: 3,
      adultPrice: 180,
      teenagerPrice: 120,
      childPrice: 90
    },
    {
      minParticipants: 4,
      maxParticipants: 8,
      adultPrice: 150,
      teenagerPrice: 100,
      childPrice: 75
    }
  ]
}"
actions["experiences/updatePricing"]="Atualizar preços da experiência"

input_models["experiences/cloneExperience"]="{
  experienceId: 'exp_123',
  newTitle: 'Cópia de Experiência Original',
  customizations: {
    duration: 5,
    meetingPoint: 'Novo ponto de encontro'
  }
}"
actions["experiences/cloneExperience"]="Clonar experiência existente"

input_models["experiences/createCustomExperience"]="{
  title: 'Experiência Personalizada',
  touristId: 'tourist_123',
  baseExperienceId: 'exp_123', // Opcional, se baseada em uma existente
  date: '2023-07-20',
  participants: {
    adults: 2,
    teenagers: 1,
    children: 0
  },
  specialRequests: 'Gostaria de incluir uma parada para almoço',
  duration: 6, // horas
  locationId: 'location_123'
}"
actions["experiences/createCustomExperience"]="Criar experiência personalizada"

input_models["experiences/translateExperience"]="{
  experienceId: 'exp_123',
  languageCode: 'es',
  translations: {
    title: 'Título en Español',
    shortDescription: 'Breve descripción',
    fullDescription: 'Descripción completa...',
    servicesIncluded: ['Transporte', 'Merienda'],
    servicesNotIncluded: ['Bebidas alcohólicas'],
    meetingPoint: 'Punto de encuentro'
  }
}"
actions["experiences/translateExperience"]="Traduzir experiência para outro idioma"

# Availability
input_models["availability/createAvailabilityTemplate"]="{
  guideId: 'guide_123',
  experienceId: 'exp_123',
  name: 'Horário Padrão',
  isActive: true
}"
actions["availability/createAvailabilityTemplate"]="Criar template de disponibilidade"

input_models["availability/updateAvailabilityTemplate"]="{
  templateId: 'template_123',
  name: 'Horário de Verão',
  isActive: true
}"
actions["availability/updateAvailabilityTemplate"]="Atualizar template de disponibilidade"

input_models["availability/addTimeBlock"]="{
  templateId: 'template_123',
  dayOfWeek: 1, // 0 = Domingo, 1 = Segunda, etc.
  startTime: '09:00',
  endTime: '17:00'
}"
actions["availability/addTimeBlock"]="Adicionar bloco de horário"

input_models["availability/removeTimeBlock"]="{
  blockId: 'block_123'
}"
actions["availability/removeTimeBlock"]="Remover bloco de horário"

input_models["availability/addException"]="{
  guideId: 'guide_123',
  experienceId: 'exp_123',
  exceptionDate: '2023-12-25',
  isAvailable: false,
  reason: 'Feriado de Natal'
}"
actions["availability/addException"]="Adicionar exceção de disponibilidade"

input_models["availability/removeException"]="{
  exceptionId: 'exception_123'
}"
actions["availability/removeException"]="Remover exceção de disponibilidade"

input_models["availability/getAvailableDates"]="{
  guideId: 'guide_123',
  experienceId: 'exp_123',
  startDate: '2023-06-01',
  endDate: '2023-06-30'
}"
actions["availability/getAvailableDates"]="Obter datas disponíveis"

input_models["availability/getAvailableTimes"]="{
  guideId: 'guide_123',
  experienceId: 'exp_123',
  date: '2023-06-15'
}"
actions["availability/getAvailableTimes"]="Obter horários disponíveis para uma data"

# Bookings
input_models["bookings/createBooking"]="{
  experienceId: 'exp_123',
  guideId: 'guide_123',
  touristId: 'tourist_123',
  bookingDate: '2023-07-15',
  bookingTime: '10:00',
  adultCount: 2,
  teenagerCount: 1,
  childCount: 0,
  adultPrice: 150,
  teenagerPrice: 100,
  childPrice: 75,
  touristName: 'Nome do Turista',
  touristEmail: 'turista@exemplo.com',
  touristPhone: '11999999999',
  hotel: 'Hotel Central',
  specialRequests: 'Tenho restrições alimentares'
}"
actions["bookings/createBooking"]="Criar nova reserva"

input_models["bookings/updateBooking"]="{
  bookingId: 'booking_123',
  bookingDate: '2023-07-16',
  bookingTime: '11:00',
  adultCount: 3,
  teenagerCount: 1,
  childCount: 0,
  specialRequests: 'Atualização dos pedidos especiais'
}"
actions["bookings/updateBooking"]="Atualizar reserva"

input_models["bookings/cancelBooking"]="{
  bookingId: 'booking_123',
  reason: 'Mudança de planos',
  requestRefund: true
}"
actions["bookings/cancelBooking"]="Cancelar reserva"

input_models["bookings/confirmBooking"]="{
  bookingId: 'booking_123',
  paymentIntentId: 'pi_123456',
  paymentMethod: 'card'
}"
actions["bookings/confirmBooking"]="Confirmar reserva (após pagamento)"

input_models["bookings/completeBooking"]="{
  bookingId: 'booking_123',
  notes: 'Experiência realizada com sucesso'
}"
actions["bookings/completeBooking"]="Marcar reserva como concluída"

input_models["bookings/listBookings"]="{
  userId: 'user_123',
  userType: 'guide', // ou 'tourist'
  status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
  startDate: '2023-06-01',
  endDate: '2023-06-30',
  page: 1,
  limit: 10
}"
actions["bookings/listBookings"]="Listar reservas (turista ou guia)"

input_models["bookings/getBookingDetails"]="{
  bookingId: 'booking_123'
}"
actions["bookings/getBookingDetails"]="Obter detalhes de uma reserva"

input_models["bookings/calculateBookingPrice"]="{
  experienceId: 'exp_123',
  date: '2023-07-15',
  adultCount: 2,
  teenagerCount: 1,
  childCount: 0
}"
actions["bookings/calculateBookingPrice"]="Calcular preço da reserva"

input_models["bookings/processPayment"]="{
  bookingId: 'booking_123',
  paymentMethod: {
    type: 'card',
    cardNumber: '4242424242424242',
    expMonth: 12,
    expYear: 2025,
    cvc: '123'
  },
  savePaymentMethod: true
}"
actions["bookings/processPayment"]="Processar pagamento da reserva"

input_models["bookings/sendBookingConfirmation"]="{
  bookingId: 'booking_123',
  sendTo: 'email', // 'email', 'sms', 'both'
  language: 'pt-BR'
}"
actions["bookings/sendBookingConfirmation"]="Enviar confirmação da reserva"

# Reviews
input_models["reviews/createReview"]="{
  bookingId: 'booking_123',
  experienceId: 'exp_123',
  guideId: 'guide_123',
  rating: 5,
  comment: 'Experiência incrível! O guia foi muito atencioso e conhecedor.'
}"
actions["reviews/createReview"]="Criar avaliação"

input_models["reviews/updateReview"]="{
  reviewId: 'review_123',
  rating: 4,
  comment: 'Experiência muito boa, mas poderia melhorar em alguns aspectos.'
}"
actions["reviews/updateReview"]="Atualizar avaliação"

input_models["reviews/deleteReview"]="{
  reviewId: 'review_123',
  reason: 'Informações incorretas'
}"
actions["reviews/deleteReview"]="Excluir avaliação"

input_models["reviews/listReviews"]="{
  type: 'guide', // 'guide' ou 'experience'
  id: 'guide_123', // ID do guia ou experiência
  sortBy: 'date', // 'date', 'rating'
  sortOrder: 'desc', // 'asc', 'desc'
  page: 1,
  limit: 10
}"
actions["reviews/listReviews"]="Listar avaliações (por guia ou experiência)"

input_models["reviews/getReviewStats"]="{
  type: 'guide', // 'guide' ou 'experience'
  id: 'guide_123' // ID do guia ou experiência
}"
actions["reviews/getReviewStats"]="Obter estatísticas de avaliações"

# Chats
input_models["chats/createChat"]="{
  touristId: 'tourist_123',
  guideId: 'guide_123',
  initialMessage: 'Olá, gostaria de saber mais sobre suas experiências.'
}"
actions["chats/createChat"]="Iniciar nova conversa"

input_models["chats/sendMessage"]="{
  chatId: 'chat_123',
  senderId: 'user_123',
  senderType: 'tourist', // 'tourist' ou 'guide'
  message: 'Mensagem de texto aqui'
}"
actions["chats/sendMessage"]="Enviar mensagem"

input_models["chats/markAsRead"]="{
  chatId: 'chat_123',
  userId: 'user_123',
  userType: 'guide' // 'tourist' ou 'guide'
}"
actions["chats/markAsRead"]="Marcar mensagens como lidas"

input_models["chats/listChats"]="{
  userId: 'user_123',
  userType: 'tourist', // 'tourist' ou 'guide'
  page: 1,
  limit: 20
}"
actions["chats/listChats"]="Listar conversas"

input_models["chats/getChatMessages"]="{
  chatId: 'chat_123',
  page: 1,
  limit: 50
}"
actions["chats/getChatMessages"]="Obter mensagens de uma conversa"

# Quotations
input_models["quotations/createQuotation"]="{
  chatId: 'chat_123',
  guideId: 'guide_123',
  touristId: 'tourist_123',
  title: 'Tour Personalizado',
  description: 'Tour personalizado para família de 4 pessoas',
  itinerary: 'Visita aos principais pontos turísticos',
  date: '2023-08-10',
  duration: 6, // horas
  peopleCount: 4,
  price: 600,
  meetingPoint: 'Hotel do turista',
  inclusions: ['Transporte', 'Guia', 'Água'],
  exclusions: ['Refeições', 'Ingressos']
}"
actions["quotations/createQuotation"]="Criar nova cotação"

input_models["quotations/updateQuotation"]="{
  quotationId: 'quotation_123',
  title: 'Tour Personalizado Atualizado',
  description: 'Descrição atualizada',
  itinerary: 'Itinerário atualizado',
  date: '2023-08-15',
  duration: 7,
  peopleCount: 5,
  price: 700,
  meetingPoint: 'Novo ponto de encontro',
  inclusions: ['Transporte', 'Guia', 'Água', 'Lanche'],
  exclusions: ['Refeições principais', 'Ingressos']
}"
actions["quotations/updateQuotation"]="Atualizar cotação"

input_models["quotations/approveQuotation"]="{
  quotationId: 'quotation_123',
  comments: 'Aprovado conforme discutido'
}"
actions["quotations/approveQuotation"]="Aprovar cotação (turista)"

input_models["quotations/rejectQuotation"]="{
  quotationId: 'quotation_123',
  reason: 'Preço acima do orçamento',
  requestNewQuote: true
}"
actions["quotations/rejectQuotation"]="Rejeitar cotação (turista)"

input_models["quotations/convertToBooking"]="{
  quotationId: 'quotation_123',
  adultCount: 2,
  teenagerCount: 2,
  childCount: 0,
  touristName: 'Nome do Turista',
  touristEmail: 'turista@exemplo.com',
  touristPhone: '11999999999',
  hotel: 'Hotel Central',
  specialRequests: 'Pedidos especiais para a reserva'
}"
actions["quotations/convertToBooking"]="Converter cotação em reserva"

input_models["quotations/listQuotations"]="{
  userId: 'user_123',
  userType: 'guide', // 'tourist' ou 'guide'
  status: 'pending', // 'pending', 'approved', 'rejected', 'paid'
  page: 1,
  limit: 10
}"
actions["quotations/listQuotations"]="Listar cotações"

input_models["quotations/getQuotationDetails"]="{
  quotationId: 'quotation_123'
}"
actions["quotations/getQuotationDetails"]="Obter detalhes de uma cotação"

# Blog
input_models["blog/createPost"]="{
  title: 'Título do Post',
  content: 'Conteúdo completo do post em formato markdown ou HTML',
  excerpt: 'Breve resumo do post',
  coverImage: [File], // Arquivo de upload
  authorId: 'author_123',
  category: 'Dicas de Viagem',
  tags: ['viagem', 'dicas', 'turismo'],
  published: false
}"
actions["blog/createPost"]="Criar novo post"

input_models["blog/updatePost"]="{
  postId: 'post_123',
  title: 'Título Atualizado',
  content: 'Conteúdo atualizado',
  excerpt: 'Novo resumo',
  coverImage: [File], // Opcional
  category: 'Nova Categoria',
  tags: ['novos', 'tags']
}"
actions["blog/updatePost"]="Atualizar post"

input_models["blog/deletePost"]="{
  postId: 'post_123'
}"
actions["blog/deletePost"]="Excluir post"

input_models["blog/publishPost"]="{
  postId: 'post_123',
  scheduledDate: '2023-06-15T10:00:00Z' // Opcional, para agendamento
}"
actions["blog/publishPost"]="Publicar post"

input_models["blog/unpublishPost"]="{
  postId: 'post_123',
  reason: 'Conteúdo desatualizado'
}"
actions["blog/unpublishPost"]="Despublicar post"

input_models["blog/listPosts"]="{
  category: 'Dicas de Viagem',
  tag: 'viagem',
  authorId: 'author_123',
  published: true,
  page: 1,
  limit: 10,
  sortBy: 'date', // 'date', 'title', 'popularity'
  sortOrder: 'desc' // 'asc', 'desc'
}"
actions["blog/listPosts"]="Listar posts"

input_models["blog/getPostDetails"]="{
  slug: 'titulo-do-post'
}"
actions["blog/getPostDetails"]="Obter detalhes de um post"

input_models["blog/uploadPostImage"]="{
  postId: 'post_123',
  image: [File],
  caption: 'Legenda da imagem',
  altText: 'Texto alternativo para acessibilidade'
}"
actions["blog/uploadPostImage"]="Enviar imagem para o post"

# Marketplace
input_models["marketplace/listTemplateExperiences"]="{
  category: 'Aventura',
  location: 'São Paulo',
  minDuration: 2,
  maxDuration: 8,
  page: 1,
  limit: 10
}"
actions["marketplace/listTemplateExperiences"]="Listar experiências do marketplace"

input_models["marketplace/getTemplateDetails"]="{
  templateId: 'template_123'
}"
actions["marketplace/getTemplateDetails"]="Obter detalhes de um template"

input_models["marketplace/enrollInTemplate"]="{
  guideId: 'guide_123',
  templateId: 'template_123',
  customizations: {
    meetingPoint: 'Ponto de encontro personalizado',
    price: 150 // Preço personalizado
  }
}"
actions["marketplace/enrollInTemplate"]="Inscrever-se em um template"

input_models["marketplace/unenrollFromTemplate"]="{
  guideId: 'guide_123',
  templateId: 'template_123',
  reason: 'Não ofereço mais este tipo de experiência'
}"
actions["marketplace/unenrollFromTemplate"]="Cancelar inscrição em um template"

input_models["marketplace/listEnrolledTemplates"]="{
  guideId: 'guide_123',
  page: 1,
  limit: 10
}"
actions["marketplace/listEnrolledTemplates"]="Listar templates inscritos"

# Admin
input_models["admin/getDashboardStats"]="{
  period: 'month', // 'day', 'week', 'month', 'year'
  startDate: '2023-01-01',
  endDate: '2023-12-31'
}"
actions["admin/getDashboardStats"]="Obter estatísticas do dashboard"

input_models["admin/listUsers"]="{
  userType: 'guide', // 'tourist', 'guide', 'admin'
  status: 'active', // 'active', 'inactive'
  search: 'termo de busca',
  page: 1,
  limit: 20
}"
actions["admin/listUsers"]="Listar usuários"

input_models["admin/updateUserStatus"]="{
  userId: 'user_123',
  isActive: false,
  reason: 'Conta suspensa por violação dos termos'
}"
actions["admin/updateUserStatus"]="Atualizar status do usuário"

input_models["admin/getAuditLogs"]="{
  tableName: 'experiences', // Opcional, filtrar por tabela
  recordId: 'record_123', // Opcional, filtrar por registro
  operation: 'UPDATE', // 'INSERT', 'UPDATE', 'DELETE'
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  page: 1,
  limit: 50
}"
actions["admin/getAuditLogs"]="Obter logs de auditoria"

input_models["admin/getSystemHealth"]="{
  checkDatabase: true,
  checkStorage: true,
  checkPayments: true
}"
actions["admin/getSystemHealth"]="Verificar saúde do sistema"

input_models["admin/manageCategories"]="{
  operation: 'create', // 'create', 'update', 'delete'
  categoryId: 'category_123', // Para update/delete
  name: 'Nova Categoria',
  slug: 'nova-categoria',
  icon: 'icon-name'
}"
actions["admin/manageCategories"]="Gerenciar categorias"

input_models["admin/manageLocations"]="{
  operation: 'create', // 'create', 'update', 'delete'
  locationId: 'location_123', // Para update/delete
  name: 'Nova Localização',
  country: 'Brasil',
  state: 'São Paulo',
  latitude: -23.550520,
  longitude: -46.633308
}"
actions["admin/manageLocations"]="Gerenciar localizações"

# Utils
input_models["utils/uploadImage"]="{
  file: [File],
  folder: 'experiences', // 'experiences', 'guides', 'blog', etc.
  id: 'exp_123', // ID relacionado
  type: 'cover', // 'cover', 'gallery', 'profile', etc.
  metadata: {
    altText: 'Texto alternativo',
    caption: 'Legenda da imagem'
  }
}"
actions["utils/uploadImage"]="Enviar imagem (genérico)"

input_models["utils/deleteImage"]="{
  url: 'https://exemplo.com/imagem.jpg',
  folder: 'experiences',
  id: 'exp_123'
}"
actions["utils/deleteImage"]="Excluir imagem"

input_models["utils/getLocationCoordinates"]="{
  address: 'Av. Paulista, 1000, São Paulo, SP, Brasil'
}"
actions["utils/getLocationCoordinates"]="Obter coordenadas de um local"

input_models["utils/translateText"]="{
  text: 'Texto para traduzir',
  sourceLanguage: 'pt',
  targetLanguage: 'en'
}"
actions["utils/translateText"]="Traduzir texto"

input_models["utils/generateSlug"]="{
  text: 'Título do Post ou Experiência',
  type: 'experience' // 'experience', 'blog', etc.
}"
actions["utils/generateSlug"]="Gerar slug para URLs"

input_models["utils/validateCoupon"]="{
  code: 'DESCONTO20',
  experienceId: 'exp_123',
  userId: 'user_123'
}"
actions["utils/validateCoupon"]="Validar cupom de desconto"

# Reports
input_models["reports/getBookingReport"]="{
  period: 'month', // 'day', 'week', 'month', 'year'
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  guideId: 'guide_123', // Opcional
  locationId: 'location_123', // Opcional
  format: 'json' // 'json', 'csv', 'excel'
}"
actions["reports/getBookingReport"]="Relatório de reservas"

input_models["reports/getRevenueReport"]="{
  period: 'month', // 'day', 'week', 'month', 'year'
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  guideId: 'guide_123', // Opcional
  categoryId: 'category_123', // Opcional
  groupBy: 'guide', // 'guide', 'experience', 'category', 'location'
  format: 'json' // 'json', 'csv', 'excel'
}"
actions["reports/getRevenueReport"]="Relatório de receita"

input_models["reports/getGuidePerformanceReport"]="{
  guideId: 'guide_123',
  period: 'month', // 'day', 'week', 'month', 'year'
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  metrics: ['bookings', 'revenue', 'ratings', 'response_time'],
  format: 'json' // 'json', 'csv', 'excel'
}"
actions["reports/getGuidePerformanceReport"]="Relatório de desempenho de guias"

input_models["reports/getExperiencePerformanceReport"]="{
  experienceId: 'exp_123', // Opcional
  categoryId: 'category_123', // Opcional
  period: 'month', // 'day', 'week', 'month', 'year'
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  metrics: ['bookings', 'revenue', 'ratings', 'views'],
  format: 'json' // 'json', 'csv', 'excel'
}"
actions["reports/getExperiencePerformanceReport"]="Relatório de desempenho de experiências"

input_models["reports/exportData"]="{
  dataType: 'bookings', // 'bookings', 'users', 'experiences', 'reviews'
  filters: {
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'completed'
  },
  format: 'csv', // 'csv', 'excel', 'json'
  includeFields: ['id', 'date', 'tourist', 'guide', 'experience', 'price']
}"
actions["reports/exportData"]="Exportar dados para CSV/Excel"

# Notifications
input_models["notifications/sendNotification"]="{
  userId: 'user_123',
  type: 'booking_confirmation', // 'booking_confirmation', 'message', 'review', etc.
  title: 'Reserva Confirmada',
  message: 'Sua reserva foi confirmada com sucesso!',
  data: {
    bookingId: 'booking_123',
    experienceId: 'exp_123'
  },
  channels: ['email', 'push', 'in_app']
}"
actions["notifications/sendNotification"]="Enviar notificação"

input_models["notifications/markNotificationAsRead"]="{
  notificationId: 'notification_123',
  userId: 'user_123'
}"
actions["notifications/markNotificationAsRead"]="Marcar notificação como lida"

input_models["notifications/getUnreadNotifications"]="{
  userId: 'user_123',
  limit: 20
}"
actions["notifications/getUnreadNotifications"]="Obter notificações não lidas"

input_models["notifications/updateNotificationPreferences"]="{
  userId: 'user_123',
  preferences: {
    bookings: {
      email: true,
      push: true,
      in_app: true
    },
    messages: {
      email: false,
      push: true,
      in_app: true
    },
    marketing: {
      email: true,
      push: false,
      in_app: false
    }
  }
}"
actions["notifications/updateNotificationPreferences"]="Atualizar preferências de notificação"


# Criar diretórios e arquivos
for action_path in "${!actions[@]}"; do
    description=${actions[$action_path]}
    input_model=${input_models[$action_path]}
    dir_path=$(dirname "$BASE_DIR/$action_path")
    file_path="$BASE_DIR/$action_path.js"
    
    # Criar diretório se não existir
    mkdir -p "$dir_path"
    
    # Criar arquivo da action
    create_action_file "$file_path" "$description" "$input_model"
    
    echo "Criado: $file_path"
done

# Criar arquivo index.js
create_index_file
echo "Criado: $BASE_DIR/index.js"

echo "Estrutura de Server Actions criada com sucesso!"