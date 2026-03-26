export interface Character {
  name: string;
  avatar: string;
  greeting: string;
}

export interface KnowledgeBaseItem {
  id: string;
  category: string;
  keywords: string[];
  response: string;
  products: string[];
  show_registration_button?: boolean;
  whatsapp_group_link?: string;
}

export interface ChatData {
  characters: {
    male: Character;
    female: Character;
  };
  scenarios: {
    initial_questions: string[];
    business_transition: {
      trigger_keywords: string[];
      response: string;
    };
    support_whatsapp_link: string;
  };
  knowledge_base: KnowledgeBaseItem[];
  default_responses: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface OrderFormData {
  fullName: string;
  birthDate: string;
  phone: string;
  address: string;
  notes: string;
}

export interface RegistrationFormData {
  fullName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  phone: string;
  address: string;
  notes: string;
}
