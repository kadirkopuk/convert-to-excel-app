/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { Typography, Stack, Container, Button } from '@mui/material';
import ExcelJS from 'exceljs';
import { useGetAllProductsQuery } from '@/app/api/apiSlice';

const Home = () => {
  // const [users, setUsers] = React.useState<any>([]);

  const { data: ProducData } = useGetAllProductsQuery({});

  useEffect(() => {
    console.log(ProducData);
  }, [ProducData]);

  // Excel'e aktarma işlemi

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Veriler');

    worksheet.columns = [
      { header: 'Marka', key: 'brand' },
      { header: 'Kategori', key: 'category' },
      { header: 'İndirim Yüzdesi', key: 'discountPercentage' },
      { header: 'ID', key: 'id' },
      { header: 'Fiyat', key: 'price' },
      { header: 'Puan', key: 'rating' },
      { header: 'Stok', key: 'stock' },
      { header: 'Başlık', key: 'title' },
    ];

    // Başlık satırını özelleştirme
    worksheet.getRow(1).eachCell((cell: any) => {
      cell.font = { bold: true, size: 12 };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffff00' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Sütun genişliklerini ayarlama
    worksheet.columns.forEach((column: any) => {
      column.width = 15;
    });

    // A SATIRININ GENISLIGINI AYARLAMA

    worksheet.getColumn('A').width = 25;
    worksheet.getColumn('H').width = 40;
    worksheet.getColumn('B').width = 30;

    ProducData.products.forEach((item: any) => {
      const userData = {
        brand: item.brand,
        category: item.category,
        discountPercentage: item.discountPercentage,
        id: item.id,
        price: item.price,
        rating: item.rating,
        stock: item.stock,
        title: item.title,
      };
      const row = worksheet.addRow(userData);

      // Kenarlığı ayarlayın
      row.eachCell((cell: any) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // Excel dosyasını oluşturup indirme işlemi
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Kullanici.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <h1>EXCEL DENEME</h1>
      <Button onClick={exportToExcel} variant="contained" color="primary">
        Verileri Excel'e Aktar
      </Button>
    </Container>
  );
};

export default Home;
