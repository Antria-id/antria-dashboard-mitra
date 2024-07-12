import React from 'react';
import { Chart as ChartJS } from 'chart.js';
import { mount } from '@cypress/react';
import BarChart from '../../src/component/Chart/BarChart'; // Sesuaikan path impor sesuai struktur proyek Anda

describe('BarChart.cy.js', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://development.verni.yt/pesanan', {
      statusCode: 200,
      body: [
        { created_at: '2023-01-15T10:00:00Z', pemesanan: 'ONLINE' },
        { created_at: '2023-02-20T10:00:00Z', pemesanan: 'OFFLINE' },
        { created_at: '2023-03-25T10:00:00Z', pemesanan: 'ONLINE' },
        // Tambahkan data lain yang dibutuhkan untuk pengujian
      ],
    }).as('getPesanan');
  });

  it('renders the bar chart with correct data', () => {
    mount(<BarChart />);
    cy.wait('@getPesanan');

    // Memverifikasi bahwa elemen canvas dari chart telah dirender
    cy.get('canvas').should('be.visible');

    // Memverifikasi bahwa label chart sesuai dengan bulan
    const expectedLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    cy.get('canvas').then(($canvas) => {
      const chartInstance = ChartJS.getChart($canvas[0]);
      const chartLabels = chartInstance.data.labels;
      expect(chartLabels).to.deep.equal(expectedLabels);
    });

    // Memverifikasi bahwa data chart sesuai dengan yang diharapkan
    const expectedOnlineData = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expectedOfflineData = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cy.get('canvas').then(($canvas) => {
      const chartInstance = ChartJS.getChart($canvas[0]);
      const onlineData = chartInstance.data.datasets[0].data;
      const offlineData = chartInstance.data.datasets[1].data;
      expect(onlineData).to.deep.equal(expectedOnlineData);
      expect(offlineData).to.deep.equal(expectedOfflineData);
    });
  });
});
