// types.ts
export interface Profile {
  name: string;
  phone_number: string;
}

export interface EmergencyResponse {
  id: string;
  responder_id: string;
  response_text: string;
  created_at: string;
  responder?: {
    name: string;
  };
}

export interface EmergencyCall {
  id: string;
  caller_id: string;
  caller_location: {
    latitude: number;
    longitude: number;
  };
  caller_address: string;
  status: 'active' | 'in_progress' | 'resolved';
  created_at: string;
  profiles: Profile;
  responses?: EmergencyResponse[];
}