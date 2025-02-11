export type Service = {
    id: number;
    name: string;
    duration: string;
    price: number;
    image: string;
  };
  
  export type Employee = {
    id: number;
    name: string;
    role: string;
    image: string;
    services: number[]; // IDs dos serviços que o funcionário realiza
    schedule: {
      start: string;
      end: string;
      daysOff: number[]; // 0-6 (domingo-sábado)
    };
  };
  
  export type Business = {
    id: number;
    name: string;
    code: string;
    category: string;
    rating: number;
    image: string;
    address: string;
    services: Service[];
    employees: Employee[];
  };
  
  export type Category = {
    id: number;
    name: string;
    icon: string;
  };