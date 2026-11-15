export interface ServiceItem {
  _id: string,
  name: string,
  description: string,
  estimatedDuration: Number,
  serviceFee: Number,
  isActive: Boolean,
  __v: number,
}
  
export interface ServiceJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: ServiceItem[]
}

export interface AppointmentItem {
  service: string;
  registrationNumber: string;
  brand: string;
  model: string;
  appointmentDate: string;
  startTime: string;
}