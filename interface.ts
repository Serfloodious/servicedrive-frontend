export interface ServiceItem {
  _id: string,
  name: string,
  description: string,
  estimatedDuration: Number,
  serviceFee: Number,
  __v: number,
}
  
export interface ServiceJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: ServiceItem[]
}

export interface AppointmentItem {
  _id: string;
  service: {
    _id: string;
    name: string;
  } | null;
  registrationNumber: string;
  brand: string;
  model: string;
  appointmentDate: string;
  startTime: string;
}

export interface AppointmentJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: AppointmentItem[]
}