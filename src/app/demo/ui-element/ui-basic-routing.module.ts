import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './ajouter-room/ajouter-room.component';
import { AddRestaurantComponent } from './ajouter-restaurant/ajouter-restaurant.component';
import { AddOffreComponent } from './ajouter-offer/ajouter-offer.component';
import { AddServiceComponent } from './ajouter-service/ajouter-service.component';
import { AddSpaComponent } from './ajouter-spa/ajouter-spa.component';
import { AddConferenceComponent } from './ajouter-conference/ajouter-conference.component';

const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'ajouter-hotel',
        loadComponent: () => import('./ajouter-hotel/ajouter-hotel.component')
      },
      {
        path: 'liste-hotel',
        loadComponent: () => import('./liste-hotel/liste-hotel.component')
      },
      { 
        path: 'ajouter-room/:hotelId', 
        component: AddRoomComponent
      },
      {
        path: 'liste-room',
        loadComponent: () => import('./listeroom/listroom.component')
      },
      {
        path: 'ajouter-restaurant/:hotelId', 
        component: AddRestaurantComponent
      },
      {
        path: 'liste-restaurant',
        loadComponent: () => import('./liste-restaurant/liste-restaurant.component')
      },
      {
        path: 'ajouter-offer/:hotelId', 
        component: AddOffreComponent
      },
      {
        path: 'liste-offer',
        loadComponent: () => import('./liste-offer/liste-offer.component')
      },
      {
        path: 'ajouter-service/:hotelId', 
        component: AddServiceComponent
      },
      {
        path: 'liste-service',
        loadComponent: () => import('./liste-service/liste-service.component')
      },
      {
        path: 'ajouter-spa/:hotelId', 
        component: AddSpaComponent
      },
      {
        path: 'liste-spa',
        loadComponent: () => import('./liste-spa/liste-spa.component')
      },
      {
        path: 'ajouter-conference/:hotelId', 
        component: AddConferenceComponent
      },
      {
        path: 'liste-conference',
        loadComponent: () => import('./liste-conference/liste-conference.component')
      },
      {
        path: 'ajouter-security-service',
        loadComponent: () => import('./ajouter-security-service/ajouter-security-service.component')
      },
      {
        path: 'ajouter-entertainment-service',
        loadComponent: () => import('./ajouter-entertainment-service/ajouter-entertainment-service.component')
      },
      {
        path: 'ajouter-big-data-metric',
        loadComponent: () => import('./ajouter-big-data-metric/ajouter-big-data-metric.component')
      },

      {
        path: 'gestion-document',
        loadComponent: () => import('./gestion-document/gestion-document.component')
      },
      {
        path: 'badges',
        loadComponent: () => import('./badge/badge.component')
      },
      {
        path: 'button',
        loadComponent: () => import('./button/button.component')
      },
      {
        path: 'breadcrumb-paging',
        loadComponent: () => import('./breadcrumb/breadcrumb.component')
      },
      {
        path: 'collapse',
        loadComponent: () => import('./collapse/collapse.component')
      },
      {
        path: 'tabs-pills',
        loadComponent: () => import('./tabs-pills/tabs-pills.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography/typography.component')
      },
      {
        path: 'update-etudient/:id',
        loadComponent: () => import('./update-etudient/update-etudient.component')
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
