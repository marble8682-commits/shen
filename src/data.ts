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
    name: '御富通 (Eefooton)',
    tagline: '',
    description: '御富通為多種天然中藥萃取，用於調節生理機能，並已取得已取得UKAS ISO 22000及HACCP雙重認證。',
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
    description: '元化益為天然中藥萃取而成，已取得UKAS ISO 22000及HACCP雙重認證。',
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
