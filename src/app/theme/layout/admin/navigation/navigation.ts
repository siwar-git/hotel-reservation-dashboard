export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      },

   
    ]
  },

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Hotel',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'ajouter-hotel',
            title: 'Ajouter Hotel',
            type: 'item',
            url: '/component/ajouter-hotel'
          },
          {
            id: 'liste-hotel',
            title: 'Liste hotels',
            type: 'item',
            url: '/component/liste-hotel'
          },
        
        ]
      }
    ]
  },
  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Room',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-room',
            title: 'Ajouter Room',
            type: 'item',
            url: '/component/ajouter-room'
          },
          {
            id: 'liste-room',
            title: 'Liste room',
            type: 'item',
            url: '/component/liste-room'
          }
        ]
      }
    ]
  },
  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Restaurant',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'ajouter-restaurant',
            title: 'Ajouter Restaurant',
            type: 'item',
            url: '/component/ajouter-restaurant'
          },
          {
            id: 'liste-restaurant',
            title: 'Liste Restaurant',
            type: 'item',
            url: '/component/liste-restaurant'
          }
        ]
      }
    ]
  },


  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Offer',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'ajouter-offer',
            title: 'Ajouter Offer',
            type: 'item',
            url: '/component/ajouter-offer'
          },
          {
            id: 'liste-offer',
            title: 'Liste offers',
            type: 'item',
            url: '/component/liste-offer'
          },
        ]
      }
    ]
  },


  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Services',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-service',
            title: 'Ajouter-services',
            type: 'item',
            url: '/component/ajouter-service'
          },
          {
            id: 'liste-service',
            title: 'Liste-services',
            type: 'item',
            url: '/component/liste-service'
          },
        ]
      }
    ]
  },


  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion Spas',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-spa',
            title: 'Ajouter-spa',
            type: 'item',
            url: '/component/ajouter-spa'
          },
          {
            id: 'liste-spa',
            title: 'Liste-spa',
            type: 'item',
            url: '/component/liste-spa'
          },
        ]
      }
    ]
  },

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Conferences',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-conference',
            title: 'Ajouter-conference',
            type: 'item',
            url: '/component/ajouter-conference'
          },
          {
            id: 'liste-conference',
            title: 'Liste-conferences',
            type: 'item',
            url: '/component/liste-conference'
          },
        ]
      }
    ]
  },

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Security',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-security-service',
            title: 'Ajouter-security-service',
            type: 'item',
            url: '/component/ajouter-security-service'
          }
        ]
      }
    ]
  },
  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-Entreprices',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-entertainment-service',
            title: 'Ajouter-entertainment-service',
            type: 'item',
            url: '/component/ajouter-entertainment-service'
          }
        ]
      }
    ]
  },
  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Gestion-BigData',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'ajouter-big-data-metric',
            title: 'Ajouter-big-data-metric',
            type: 'item',
            url: '/component/ajouter-big-data-metric'
          }
        ]
      }
    ]
  },

  {
    id: 'ui-component',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'group',
        icon: 'icon-group',
        children: [
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            icon: 'feather icon-log-in',
            target: true,
            breadcrumbs: false
          },
        ]
      }
    ]
  },
]

