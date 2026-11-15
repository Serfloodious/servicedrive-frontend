interface ServiceItem {
    _id: string,
    name: string,
    description: string,
    estimatedDuration: Number,
    serviceFee: Number,
    isActive: Boolean,
    __v: number,
    id: string
  }
  
  interface ServiceJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: ServiceItem[]
  }