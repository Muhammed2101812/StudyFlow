import React from 'react';
import Card from '../components/common/Card';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">Bugünün Programı</h3>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">Program yüklenmedi</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">Haftalık Özet</h3>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">Veri yok</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">Sınava Kalan Gün</h3>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">Plan seçilmedi</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
