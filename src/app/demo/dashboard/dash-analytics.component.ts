import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';

// 3rd party imports
import {
  ApexOptions,
  ApexTitleSubtitle,
  ChartComponent,
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend
} from 'ng-apexcharts';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ProductSaleComponent } from "./product-sale/product-sale.component";
import { SecurityService } from 'src/app/services/security.service';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { BigDataMetricService } from 'src/app/services/bigDataMetric.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  xaxis?: ApexXAxis;
  yaxis?: any | any[];
  colors?: string[];
  fill?: ApexFill;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
  legend?: ApexLegend;
};

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule, ProductSaleComponent],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent implements OnInit {

  totalHotel!: number;
  totalRoom!: number;
  totalClient!: number;
  totalReservation!: number;

  totalSecurityServices!: any[];
  totalEntertainmentServices!: any[];
  totalMetrics!: any[];

  cards: any[] = [];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions_6: Partial<ChartOptions> | any;
  @ViewChild('chart2') chart2!: ChartComponent;
  public chartOptions_roomType: Partial<ChartOptions> | any;
  @ViewChild('chart3') chart3!: ChartComponent;
  public chartOptions_clientsPoints: Partial<ApexOptions> | any;
  @ViewChild('chart4') chart4!: ChartComponent;
  public chartOptions_reservations: Partial<ApexOptions> | any;
  @ViewChild('chart5') chart5!: ChartComponent; // Référence pour le graphique d'occupation
  public chartOptions_occupancy: Partial<ApexOptions> | any; // Options pour le graphique d'occupation
  @ViewChild('chart6') chart6!: ChartComponent; // Référence pour le graphique de revenu
  public chartOptions_revenue: Partial<ApexOptions> | any; // Options pour le graphique de revenu
  items: any;
  trackByFn: TrackByFunction<any> | undefined;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private clientService: ClientService,
    private reservationService: ReservationService,
    private securityService: SecurityService,
    private entertainmentService: EntertainmentService,
    private BigDataMetricService: BigDataMetricService
  ) {}

  images = [
    { src: 'assets/images/gallery-grid/img-grd-gal-1.jpg', title: 'Old Scooter', size: 'PNG-100KB' },
    { src: 'assets/images/gallery-grid/img-grd-gal-2.jpg', title: 'Wall Art', size: 'PNG-150KB' },
    { src: 'assets/images/gallery-grid/img-grd-gal-3.jpg', title: 'Microphone', size: 'PNG-150KB' }
  ];

  ngOnInit(): void {
    this.gettotalHotel();
    this.getHotelByStarRatingDistribution();
    this.getRoomTypeDistribution();
    this.getClientPointsData();
    this.getReservationsByMonth();
    this.getRoomOccupancyByType(); // Récupérer les données d'occupation
    this.getTotalRevenueByMonth(); // Récupérer les données de revenu
    this.gettotalRoom();
    this.gettotalClient();
    this.gettotalReservation();
    this.getHotelsSummary();
    this.getAllSecurityServices();
    this.getAllEntertainmentServices();
    this.getAllMetrics();
  }

  getHotelsSummary() {
    this.hotelService.getHotelsSummary().subscribe((summaries: any[]) => {
      console.log('Résumé des hôtels :', summaries);
      // Tu peux stocker ce résumé dans une propriété si tu veux l'afficher :
      this.items = summaries;
      // Par exemple, tu pourrais en faire un tableau ou créer un autre graphique
    });
  }

  gettotalHotel() {
    this.hotelService.getTotalHotels().subscribe((res: any) => {
      this.totalHotel = res;
      this.buildCards();
    });
  }

  gettotalRoom() {
    this.roomService.getTotalRooms().subscribe((res: any) => {
      this.totalRoom = res;
      this.buildCards();
    });
  }

  gettotalClient() {
    this.clientService.getTotalClients().subscribe((res: any) => {
      this.totalClient = res;
      this.buildCards();
    });
  }

  gettotalReservation() {
    this.reservationService.getTotalReservations().subscribe((res: any) => {
      this.totalReservation = res;
      this.buildCards();
    });
  }

  getHotelByStarRatingDistribution() {
    this.hotelService.getAllHotels().subscribe((hotels: any[]) => {
      const starCounts = [0, 0, 0, 0, 0];

      hotels.forEach(hotel => {
        const stars = hotel.nombre_etoiles;
        if (stars >= 1 && stars <= 5) {
          starCounts[stars - 1]++;
        }
      });

      this.chartOptions_6 = {
        series: [{
          name: "Nombre d'hôtels",
          data: starCounts
        }],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false
          }
        },
        xaxis: {
          categories: ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★']
        },
        colors: ['#1E90FF'],
        title: {
          text: "Répartition des hôtels par nombre d'étoiles"
        }
      };
    });
  }

  getRoomTypeDistribution() {
    const roomTypeCounts = {
      Simple: 50,
      Double: 80,
      Suite: 30,
      'Luxe': 15
    };

    this.chartOptions_roomType = {
      series: Object.values(roomTypeCounts),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: Object.keys(roomTypeCounts),
      colors: ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f'],
      legend: {
        position: 'bottom'
      },
      title: {
        text: "Répartition des types de chambres"
      }
    };
  }

  getClientPointsData() {
    const clientPoints = [
      { x: 1, y: 50, z: 20 },
      { x: 2, y: 70, z: 35 },
      { x: 3, y: 30, z: 10 },
      { x: 4, y: 90, z: 50 },
      { x: 5, y: 60, z: 25 }
    ];

    this.chartOptions_clientsPoints = {
      series: [
        {
          name: 'Points Clients',
          data: clientPoints
        }
      ],
      chart: {
        type: 'scatter',
        height: 350
      },
      xaxis: {
        title: {
          text: 'Client ID'
        }
      },
      yaxis: {
        title: {
          text: ' '
        }
      },
      tooltip: {
        x: {
          formatter: function(val: number) {
            return "Client #" + val;
          }
        },
        y: {
          formatter: function(val: number) {
            return val + " points";
          }
        },
        z: {
          formatter: function(val: number) {
            return "Taille: " + val;
          }
        }
      },
      title: {
        text: 'Points des Clients'
      }
    };
  }

  getReservationsByMonth() {
    const monthlyReservations = [
      { month: 'Jan', count: 35 },
      { month: 'Fév', count: 48 },
      { month: 'Mar', count: 28 },
      { month: 'Avr', count: 52 },
      { month: 'Mai', count: 41 },
      { month: 'Juin', count: 60 }
    ];

    this.chartOptions_reservations = {
      series: [
        {
          name: 'Réservations',
          data: monthlyReservations.map(item => item.count)
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: monthlyReservations.map(item => item.month),
        title: {
          text: 'Mois'
        }
      },
      yaxis: {
        title: {
          text: 'Nombre de réservations'
        }
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Nombre de réservations par mois'
      }
    };
  }

  // Simuler le taux d'occupation des chambres par type
  getRoomOccupancyByType() {
    const occupancyData = [
      { type: 'Simple', occupied: 40, total: 60 },
      { type: 'Double', occupied: 70, total: 100 },
      { type: 'Suite', occupied: 25, total: 35 },
      { type: 'Luxe', occupied: 10, total: 15 }
    ];

    this.chartOptions_occupancy = {
      series: [
        {
          name: 'Taux d\'occupation (%)',
          data: occupancyData.map(item => (item.occupied / item.total) * 100)
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: occupancyData.map(item => item.type),
        title: {
          text: 'Types de chambres'
        }
      },
      title: {
        text: 'Taux d\'occupation des chambres'
      }
    };
  }

  // Simuler les revenus par mois
  getTotalRevenueByMonth() {
    const revenueData = [
      { month: 'Jan', revenue: 5000 },
      { month: 'Fév', revenue: 6200 },
      { month: 'Mar', revenue: 4700 },
      { month: 'Avr', revenue: 7100 },
      { month: 'Mai', revenue: 5900 },
      { month: 'Juin', revenue: 8000 }
    ];

    this.chartOptions_revenue = {
      series: [
        {
          name: 'Revenu',
          data: revenueData.map(item => item.revenue)
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: revenueData.map(item => item.month),
        title: {
          text: 'Mois'
        }
      },
      yaxis: {
        title: {
          text: 'Revenu (en DT)'
        }
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Revenu par mois'
      }
    };
  }

  getAllSecurityServices() {
    this.securityService.getAllSecurityServices().subscribe((services: any[]) => {
      this.totalSecurityServices = services;
      console.log('Security Services:', services);
    });
  }

  getAllEntertainmentServices() {
    this.entertainmentService.getAllEntertainmentServices().subscribe((services: any[]) => {
      this.totalEntertainmentServices = services;
      console.log('Entertainment Services:', services);
    });
  }

  getAllMetrics() {
    this.BigDataMetricService.getAllMetrics().subscribe((metrics: any[]) => {
      this.totalMetrics = metrics;
      console.log('Metrics:', metrics);
    });
  }

  buildCards() {
    if (
      this.totalHotel !== undefined &&
      this.totalRoom !== undefined &&
      this.totalClient !== undefined &&
      this.totalReservation !== undefined
    ) {
      this.cards = [
        {
          background: 'bg-c-blue',
          title: 'Total Hotels',
          icon: 'icon-home',
          text: 'Registered Hotels',
          number: this.totalHotel
        },
        {
          background: 'bg-c-green',
          title: 'Total Clients',
          icon: 'icon-user',
          text: 'Registered Clients',
          number: this.totalClient
        },
        {
          background: 'bg-c-yellow',
          title: 'Total Rooms',
          icon: 'icon-basket-loaded',
          text: 'Rooms Available',
          number: this.totalRoom
        },
        {
          background: 'bg-c-red',
          title: 'Total Reservations',
          icon: 'icon-check',
          text: 'Reservations Made',
          number: this.totalReservation
        }
      ];
    }
  }
}
