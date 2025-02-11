import { Business, Category } from './types';

export const categories: Category[] = [
  { id: 1, name: 'Cabeleireiro', icon: 'scissors' },
  { id: 2, name: 'Barbearia', icon: 'scissors' },
  { id: 3, name: 'Manicure', icon: 'nail' },
  { id: 4, name: 'Spa', icon: 'flower' },
  { id: 5, name: 'Maquiagem', icon: 'brush' },
  { id: 6, name: 'Penteados', icon: 'hair' },
  { id: 7, name: 'Depilação', icon: 'wax' }
];

export const businesses: Business[] = [
  {
    id: 1,
    name: 'Salão Beleza Natural',
    code: 'SalaoBelezaNatural',
    category: 'Cabeleireiro',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    address: 'Rua das Flores, 123',
    services: [
      { id: 1, name: 'Corte Feminino', duration: '1h', price: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTRg9_6zBN7JGY4uGlUsJhfOdzJO71LR9YNQ&s' },
      { id: 2, name: 'Coloração', duration: '2h', price: 150, image: 'https://leportini.com.br/blog/wp-content/uploads/2023/11/quem-faz-coloracao.png' },
      { id: 3, name: 'Hidratação', duration: '45min', price: 70, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChFj0iOg8qO39dBklxv9BQFcK6y7cj8Fy5g&s' }
    ],
    employees: [
      {
        id: 1,
        name: 'Maria Silva',
        role: 'Cabeleireira',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        services: [1, 2, 3],
        schedule: {
          start: '09:00',
          end: '18:00',
          daysOff: [0] // Domingo
        }
      },
      {
        id: 2,
        name: 'Ana Santos',
        role: 'Colorista',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        services: [2, 3],
        schedule: {
          start: '10:00',
          end: '19:00',
          daysOff: [0, 6] // Domingo e Sábado
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Barbearia Vintage',
    code: 'BarbeariaVintage',
    category: 'Barbearia',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    address: 'Av. Principal, 456',
    services: [
      { id: 1, name: 'Corte Masculino', duration: '45min', price: 60, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Barba', duration: '30min', price: 40, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Corte + Barba', duration: '1h15min', price: 90, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'João Costa',
        role: 'Barbeiro',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        services: [1, 2, 3],
        schedule: {
          start: '09:00',
          end: '18:00',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 3,
    name: 'TA',
    code: 'TA',
    category: 'Manicure',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    address: 'Av. Principal, 456',
    services: [
      { id: 1, name: 'Corte Masculino', duration: '45min', price: 60, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Barba', duration: '30min', price: 40, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Corte + Barba', duration: '1h15min', price: 90, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'João Costa',
        role: 'Barbeiro',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        services: [1, 2, 3],
        schedule: {
          start: '09:00',
          end: '18:00',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 4,
    name: 'TE',
    code: 'TE',
    category: 'Manicure',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    address: 'Av. Principal, 456',
    services: [
      { id: 1, name: 'Corte Masculino', duration: '45min', price: 60, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Barba', duration: '30min', price: 40, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Corte + Barba', duration: '1h15min', price: 90, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'João Costa',
        role: 'Barbeiro',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        services: [1, 2, 3],
        schedule: {
          start: '09:00',
          end: '18:00',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 5,
    name: 'Luxe Spa',
    code: 'LuxeSpa',
    category: 'Spa',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1571901728370-07db49f5e5b7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHxyZWxheCUyMGF0JTIwc3BhfGVufDB8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080',
    address: 'Rua das Palmeiras, 789',
    services: [
      { id: 1, name: 'Massagem Relaxante', duration: '1h', price: 120, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Banho de Ofurô', duration: '1h15min', price: 180, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Reflexologia', duration: '50min', price: 100, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'Cláudia Oliveira',
        role: 'Terapeuta',
        image: 'https://images.unsplash.com/photo-1532022206169-9c7d53c0b6a2?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vYmlsZWFuJTIwdGhlcmFwaXN0fGVufDB8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080',
        services: [1, 2, 3],
        schedule: {
          start: '08:00',
          end: '17:00',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Estúdio Maquiagem Perfeita',
    code: 'EstudioMaquiagemPerfeita',
    category: 'Maquiagem',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1511749345188-bf11d2a11d97?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fG1ha3VldGUlMjBxdWVzdGlvbnxlbnwwfDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    address: 'Rua do Estúdio, 201',
    services: [
      { id: 1, name: 'Maquiagem para Casamento', duration: '2h', price: 250, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Maquiagem para Festas', duration: '1h30min', price: 150, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Maquiagem para Noiva', duration: '3h', price: 350, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'Fernanda Souza',
        role: 'Maquiadora',
        image: 'https://images.unsplash.com/photo-1600304321047-d22f8f1a8b55?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1ha3VldGUlMjBxdWVzdGlvbnxlbnwwfDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
        services: [1, 2, 3],
        schedule: {
          start: '09:00',
          end: '18:00',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 7,
    name: 'Penteado Glamour',
    code: 'PenteadoGlamour',
    category: 'Penteados',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1502922241077-0d52ac63592a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHBldGluYWRvc3xlbnwwfDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    address: 'Av. das Estrelas, 999',
    services: [
      { id: 1, name: 'Penteado Social', duration: '1h30min', price: 120, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Penteado para Noiva', duration: '2h', price: 200, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Penteado de Festa', duration: '1h', price: 100, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'Laura Martins',
        role: 'Penteadeira',
        image: 'https://images.unsplash.com/photo-1563351632-09c73692b05e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDdoeXBlfGVufDB8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080',
        services: [1, 2, 3],
        schedule: {
          start: '10:00',
          end: '19:00',
          daysOff: [6] // Sábado
        }
      }
    ]
  },
  {
    id: 8,
    name: 'Barbearia Clássica',
    code: 'BarbeariaClassica',
    category: 'Barbearia',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1585100196601-f4a9c06d7ca8?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGJhcmJlYXJpYXVwYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    address: 'Rua do Comércio, 555',
    services: [
      { id: 1, name: 'Corte Masculino Clássico', duration: '45min', price: 50, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Barba Clássica', duration: '30min', price: 35, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Corte + Barba Clássico', duration: '1h15min', price: 80, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'Carlos Almeida',
        role: 'Barbeiro',
        image: 'https://images.unsplash.com/photo-1577613836425-fb1e94f18d09?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDkyfHxiYXJiZXJpYXV8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
        services: [1, 2, 3],
        schedule: {
          start: '08:30',
          end: '17:30',
          daysOff: [0] // Domingo
        }
      }
    ]
  },
  {
    id: 9,
    name: 'DepilArte',
    code: 'DepilArte',
    category: 'Depilação',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1591676397360-1eac3d08b42a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDhzfHvkZXBpbGFjwXBwZXxlbnwwfDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
    address: 'Rua do Sol, 1234',
    services: [
      { id: 1, name: 'Depilação Corporal', duration: '1h', price: 90, image: '/src/lib/images/no_image.png' },
      { id: 2, name: 'Depilação Facial', duration: '45min', price: 60, image: '/src/lib/images/no_image.png' },
      { id: 3, name: 'Depilação Completa', duration: '1h30min', price: 120, image: '/src/lib/images/no_image.png' }
    ],
    employees: [
      {
        id: 1,
        name: 'Vanessa Lima',
        role: 'Especialista em Depilação',
        image: 'https://images.unsplash.com/photo-1530135747869-dbd74ec4c332?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDh8fGRlcGlzYXRvcnklMjBxdWVzdGlvbnxlbnwwfDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
        services: [1, 2, 3],
        schedule: {
          start: '10:00',
          end: '19:00',
          daysOff: [6] // Sábado
        }
      }
    ]
  }
];