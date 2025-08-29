// Service-related type definitions

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
}

export interface Consultation {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  includesVideoCall: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface Booking {
  id: string;
  consultantName: string;
  consultantPhoto: string;
  serviceName: string;
  scheduledDate: string;
  duration: number;
  price: number;
  status:
    | "upcoming"
    | "completed"
    | "cancelled"
    | "pending_cancellation"
    | "pending_reschedule";
  offersVideoCall: boolean;
  rating?: number;
  rescheduleRequest?: {
    newDate: string;
    newTime: string;
    reason?: string;
    requestedAt: string;
  };
  cancellationRequest?: {
    reason?: string;
    requestedAt: string;
  };
}

export interface Review {
  id: string;
  type: "given" | "received";
  fromTo: string;
  projectTitle: string;
  rating: number;
  comment: string;
  date: string;
}
