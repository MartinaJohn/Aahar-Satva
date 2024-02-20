import React from 'react';
import { Row, Col, Tag, Card } from 'antd';
import { CheckCircleFilled, SafetyCertificateFilled, SyncOutlined, LockFilled } from '@ant-design/icons';

const { Meta } = Card;

const Service = () => {
  const our_values = [
    {
      icon: <CheckCircleFilled  style={{ fontSize: '36px' }}/>,
      title: 'Food Safety',
      description:
        'Ensuring compliance with food safety regulations and standards.',
    },
    {
      icon: <SafetyCertificateFilled style={{ fontSize: '36px' }} />,
      title: 'Quality Assurance',
      description:
        'Implementing quality assurance measures to maintain food quality.',
    },
    {
      icon: <SyncOutlined style={{ fontSize: '36px' }} />,
      title: 'Efficiency',
      description:
        'Streamlining processes for efficient food production and distribution.',
    },
    {
      icon: <LockFilled style={{ fontSize: '36px' }}/>,
      title: 'Security',
      description:
        'Ensuring the security and confidentiality of food production processes.',
    },
  ];

  const our_services = [
    {
      title: 'Food Safety Compliance',
      description: 'Ensure compliance with food safety regulations and standards.',
      rowSpan: 2,
      image:
        'https://img.freepik.com/free-vector/box-subscription-service-abstract-concept-illustration-subscription-plan-ecommerce-business-shopping-service-box-delivery-startup-internet-marketing-marketplace_335657-146.jpg?t=st=1708426813~exp=1708430413~hmac=e971ffe3fb0df263d5917aeb31bddeaf0d96bdf8eb4d7537531887950325b5fe&w=740',
      tags: ['Regulatory Compliance', 'Food Standards'],
    },
    {
      title: 'Quality Control Systems',
      description: 'Implement quality control systems to maintain food quality.',
      rowSpan: 3,
      image:
        'https://img.freepik.com/free-vector/tiny-business-people-like-standard-quality-control-standard-quality-control-iso-9001-standard-international-certification-concept-illustration_335657-2556.jpg?t=st=1708426919~exp=1708430519~hmac=8ceaa611ebddb52593dee2434d6d8880a4cd479cafaace40335261e037c8d32e&w=996',
      tags: ['Quality Assurance', 'Food Testing'],
    },
    {
      title: 'Supply Chain Management',
      description: 'Efficiently manage the supply chain for food production and distribution.',
      image:
        'https://img.freepik.com/free-vector/hand-drawn-international-trade_23-2149166407.jpg?t=st=1708426954~exp=1708430554~hmac=aaacbed39d4debc4b47fc6faaef526520c8a9630309238db30ab15196f9e1604&w=740',
      tags: ['Supply Chain', 'Logistics'],
    },
    {
      title: 'Data Security Measures',
      description:
        'Implement data security measures to protect sensitive food production data.',
      rowSpan: 2,
      image:
        'https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?w=740&t=st=1708428791~exp=1708429391~hmac=fbf7bafc200037bc7189746fda48f1f0c31101fd5205a90ab7aff70e67b7ca6d',
      tags: ['Data Security', 'Confidentiality'],
    },
    {
      title: 'Regulatory Compliance Consulting',
      description:
        'Provide consulting services for regulatory compliance in the food industry.',
      image:
        'https://img.freepik.com/free-vector/business-people-working-concluding-contract_1262-19725.jpg?t=st=1708427083~exp=1708430683~hmac=9d73ae19456a5131a9baeb16e7796eddba4cd985566ec8bbf4cdcb7829c905ff&w=740',
      tags: ['Consulting', 'Regulatory Compliance'],
    },
    {
        title: 'Awareness Forum',
        description:
          'Engage in discussions and share information related to food safety and regulations.',
        image:
          'https://img.freepik.com/free-vector/hand-drawn-community-spirit-illustration_23-2150194851.jpg?t=st=1708427007~exp=1708430607~hmac=f536814589a13885257eb95358c3a1e322b16db9b66de18b50f295a495658272&w=996',
        tags: ['Discussion', 'Awareness'],
      },
  ];

  return (
    <div className="bg-white">
      {/* Our Services */}
      <div className="grid gap-1 mt-2 py-16">
        <div className="flex justify-center ">
          <p className="text-sm font-semibold text-[99582a]">EXPLORE</p>
        </div>
        <h1 className="text-4xl mb-2 font-bold text-[#432818] tracking-tight text-center">What we do</h1>
        <div className="flex justify-center">
          <p className="text-sm text-[#432818]">Get Reliable Solutions for Food Regulation Compliance</p>
        </div>
        <Row gutter={[16, 16]} justify="center" className="mt-16">
          {our_services.map((e) => (
            <Col key={e.title} xs={24} sm={12} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt={e.title} src={e.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>}
                className={`group relative gap-4 overflow-clip rounded-xl shadow-lg ${
                  e.rowSpan ? `row-span-${e.rowSpan}` : ''
                }`}
                style={{ height: '100%' }} // Set fixed height for the card
              >
                <Meta title={e.title} description={e.description} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {e.tags.map((tag) => (
                    <Tag key={tag} className="rounded-full bg-[#FFF8EB]">{tag}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Our values */}
      <div className="mx-auto grid max-w-7xl gap-1 py-2 mt-10 mb-14  pb-6">
        <div className="flex justify-center my-1">
          <p className="text-sm font-semibold text-[#99582a]">UNDERSTAND</p>
        </div>
        <h1 className="text-4xl mb-2 font-bold text-[#432818] tracking-tight text-center">Our Values</h1>
        <div className="flex justify-center mb-4">
          <p className="text-sm text-[#432818]">Discover Our Core Principles Guiding Food Safety</p>
        </div>

        <Row gutter={[16, 16]} justify="center mt-12 mb-12">
          {our_values.map((e) => (
            <Col key={e.title} xs={24} sm={12} md={6}>
              <div className="flex flex-col gap-4 items-center text-center">
                <div className="rounded-2xl bg-muted p-4 ">{e.icon}</div>
                <div className="grid gap-3">
                  <h4 className="text-2xl text-[#432818] font-semibold">{e.title}</h4>
                  <p className="font-light text-sm text-gray-500">{e.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Service;
