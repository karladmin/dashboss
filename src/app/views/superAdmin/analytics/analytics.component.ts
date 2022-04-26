import { echartStyles } from './../../../shared/echart-styles';
import { EChartOption } from 'echarts';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  totalAppointmentchart: EChartOption;
  completeAppointmentchart: EChartOption;
  cancelAppointmentchart: EChartOption;
  salesChartBar: EChartOption;
  totalSubscriberOwnerchart: EChartOption;
  totalAppUserchart: EChartOption;
  monthNewUserChart: EChartOption;
  socialLoginChart: EChartOption;
  totapPurchaseChart: EChartOption;
  completeSalesChart: EChartOption;
  totalRevenueChart: EChartOption;
  analyticsData: any;
  loading: any = false;

  constructor(private api: ApiService) {}

  getAnaliticalData() {
    this.loading = true;
    this.api.getDataWithToken('analytics').subscribe(
      (success: any) => {
        if (success.success) {
          this.loading = false;
          this.analyticsData = success.data;
          this.totalAppointmentchart = {
            ...echartStyles.defaultOptions,
            ...{
              series: [
                {
                  data: this.analyticsData.app_month_total,
                  ...echartStyles.smoothLine,
                  lineStyle: {
                    color: '#2dce98',
                    ...echartStyles.lineShadow,
                  },
                  itemStyle: {
                    color: '#2dce98',
                  },
                },
              ],
              xAxis: [
                {
                  type: 'category',
                  data: this.analyticsData.month,
                },
              ],
            },
          };
          this.completeAppointmentchart = {
            ...echartStyles.defaultOptions,
            ...{
              series: [
                {
                  data: this.analyticsData.app_month_com,
                  ...echartStyles.smoothLine,
                  lineStyle: {
                    color: '#11cdef',
                    ...echartStyles.lineShadow,
                  },
                  itemStyle: {
                    color: '#11cdef',
                  },
                },
              ],
              xAxis: [
                {
                  type: 'category',
                  data: this.analyticsData.month,
                },
              ],
            },
          };
          this.cancelAppointmentchart = {
            ...echartStyles.defaultOptions,
            ...{
              series: [
                {
                  data: this.analyticsData.app_month_cancel,
                  ...echartStyles.smoothLine,
                  lineStyle: {
                    color: '#f53c56',
                    ...echartStyles.lineShadow,
                  },
                  itemStyle: {
                    color: '#f53c56',
                  },
                },
              ],
              xAxis: [
                {
                  type: 'category',
                  data: this.analyticsData.month,
                },
              ],
            },
          };

          this.salesChartBar = {
            grid: {
              show: false,

              right: 0,
              left: 0,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: [
              {
                type: 'category',
                data: this.analyticsData.month,
              },
            ],
            yAxis: [
              {
                show: false,
              },
            ],

            series: [
              {
                name: 'Subscription',
                data: this.analyticsData.sub_month,
                label: { show: false, color: '#639' },
                type: 'bar',
                barWidth: '40%',
                color: '#1cb1f5',
                smooth: true,
              },
            ],
          };

          this.totalSubscriberOwnerchart = {
            grid: {
              show: false,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: {
              type: 'category',
              data: this.analyticsData.month,
            },
            yAxis: {
              type: 'value',
              show: false,
            },
            series: [
              {
                data: this.analyticsData.owner_count,
                type: 'line',
                lineStyle: {
                  color: '#BB51E1',
                  shadowColor: 'rgba(0, 0, 0, .2)',
                  shadowOffsetX: -1,
                  shadowOffsetY: 8,
                  shadowBlur: 10,
                },
                itemStyle: {
                  color: '#BB51E1',
                },
              },
            ],
          };

          this.totalAppUserchart = {
            grid: {
              show: false,
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: {
              type: 'category',
              data: this.analyticsData.month,
            },
            yAxis: {
              type: 'value',
              show: false,
            },
            series: [
              {
                data: this.analyticsData.app_user,
                type: 'line',
                lineStyle: {
                  color: '#51DCE1',
                  shadowColor: 'rgba(0, 0, 0, .2)',
                  shadowOffsetX: -1,
                  shadowOffsetY: 8,
                  shadowBlur: 10,
                },
                itemStyle: {
                  color: '#51DCE1',
                },
              },
            ],
          };

          this.socialLoginChart = {
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: 'Social Login',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: this.analyticsData.loginChart.admin, name: 'Admin' },
                  {
                    value: this.analyticsData.loginChart.app_user,
                    name: 'App User',
                  },
                  { value: this.analyticsData.loginChart.owner, name: 'Owner' },
                  {
                    value: this.analyticsData.loginChart.owner_staff,
                    name: 'Owner Staff',
                  },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
            color: ['#51DCE1', '#F9C750', '#61D097', '#E15173'],
          };

          this.totapPurchaseChart = {
            grid: {
              show: false,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: [
              {
                type: 'category',

                data: this.analyticsData.month,
              },
            ],
            yAxis: [
              {
                show: false,
              },
            ],
            series: [
              {
                name: 'Product',
                data: this.analyticsData.pro_month_total,
                label: { show: false, color: '#639' },
                type: 'bar',
                barWidth: '70%',
                color: '#2DCE98',
                smooth: true,
              },
            ],
          };

          this.completeSalesChart = {
            grid: {
              show: false,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: [
              {
                type: 'category',

                data: this.analyticsData.month,
              },
            ],
            yAxis: [
              {
                show: false,
              },
            ],
            series: [
              {
                name: 'Product',
                data: this.analyticsData.pro_month_com,
                label: { show: false, color: '#639' },
                type: 'bar',
                barWidth: '70%',
                color: '#42f5dd',
                smooth: true,
              },
            ],
          };
          this.totalRevenueChart = {
            grid: {
              show: false,
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0, 0, 0, .8)',
            },
            xAxis: [
              {
                type: 'category',
                data: this.analyticsData.month,
              },
            ],
            yAxis: [
              {
                show: false,
              },
            ],
            series: [
              {
                name: 'Product',
                data: this.analyticsData.pro_month_cancel,
                label: { show: false, color: '#639' },
                type: 'bar',
                barWidth: '70%',
                color: '#F53C56',
                smooth: true,
              },
            ],
          };
        }

        this.monthNewUserChart = {
          grid: {
            show: false,
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          },
          tooltip: {
            show: true,
            backgroundColor: 'rgba(0, 0, 0, .8)',
          },
          xAxis: [
            {
              type: 'category',
              data: this.analyticsData.month,
            },
          ],
          yAxis: [
            {
              show: false,
            },
          ],

          series: [
            {
              name: 'Product Order',
              data: this.analyticsData.product_order,
              label: { show: false, color: '#639' },
              type: 'bar',
              barWidth: '70%',
              color: '#9AA9FF',
              smooth: true,
            },
          ],
        };
      },
      (err) => {}
    );
  }

  ngOnInit() {
    this.getAnaliticalData();
  }
}
