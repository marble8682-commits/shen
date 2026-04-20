export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  features: string[];
  image: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'yufutong',
    name: '御富通 (Yu Fu Tong)',
    tagline: '暢通無阻，守護心脈的黃金配方',
    description: '御富通是一款專為現代人設計的心血管健康補充品。結合傳統智慧與現代生技，精選多種天然萃取物，旨在促進血液循環，維持血管彈性，是您日常健康管理的最佳夥伴。',
    benefits: [
      '促進循環：有助於維持穩定的血液流動。',
      '維持彈性：強化血管壁的韌性。',
      '活力充沛：改善末梢循環，減少疲勞感。'
    ],
    features: [
      '天然植萃，溫和無負擔',
      '高效吸收技術',
      '通過多項SGS安全認證'
    ],
    image: 'https://picsum.photos/seed/heart/800/600',
    category: '心血管護理'
  },
  {
    id: 'yuanhuayi',
    name: '元化益 (Yuan Hua Yi)',
    tagline: '平衡代謝，重塑體內純淨環境',
    description: '元化益專注於優化身體的代謝效能。透過專利酵素配方與複合營養素，協助調節生理機能，加速體內廢物排出，讓您由內而外煥發健康光采。',
    benefits: [
      '代謝平衡：支持健康的血糖與脂質代謝。',
      '淨化排毒：協助體內循環淨化。',
      '體質調理：優化消化道機能。'
    ],
    features: [
      '專利複合酵素配方',
      '高纖零脂肪設計',
      '科學實證有效比例'
    ],
    image: 'https://picsum.photos/seed/nature/800/600',
    category: '代謝平衡'
  },
  {
    id: 'genetesting',
    name: '基因檢測 (Gene Testing)',
    tagline: '預見未來，量身打造的精準醫療',
    description: '揭開生命的黑盒子。勝心康的基因檢測服務提供全方位的遺傳風險評估，從癌症預防、慢性病風險到潛能分析，為您的健康路徑提供科學導航。',
    benefits: [
      '預防醫學：及早發現潛在遺傳風險。',
      '精準營養：根據基因提供個人化飲食建議。',
      '長期規劃：為不同人生階段制定健康方案。'
    ],
    features: [
      '次世代定序技術 (NGS)',
      '專業醫學報告解讀',
      '高度隱私安全保障'
    ],
    image: 'https://picsum.photos/seed/dna/800/600',
    category: '精準醫療'
  }
];
