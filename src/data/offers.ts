import { OfferDeal } from '../types';
import { OOTY_IMAGE, MADURAI_IMAGE, CHETTINAD_IMAGE, HERO_IMAGE } from './destinations';

export const OFFERS: OfferDeal[] = [
  {
    id: 'off-1',
    title: 'Heritage Stays in Chettinad & Madurai: 25% Off',
    category: 'Hotel',
    discountLabel: '25% OFF',
    promoCode: 'TNHERITAGE25',
    validity: 'Valid until Nov 30, 2026',
    terms: 'Demonstration voucher: Applicable on min 2-night stays at participating heritage boutique villas. Local sample demonstration promo.',
    image: CHETTINAD_IMAGE,
  },
  {
    id: 'off-2',
    title: 'Nilgiri Mountain Rail & Hill Stays Combo',
    category: 'Package',
    discountLabel: 'FLAT ₹1,500 OFF',
    promoCode: 'NILGIRISKY',
    validity: 'Valid until Dec 15, 2026',
    terms: 'Demonstration voucher: Includes tea factory tasting tour and toy train ticket reservation assistance. Sample offer.',
    image: OOTY_IMAGE,
  },
  {
    id: 'off-3',
    title: 'Temple Food Trails & Banana Leaf Dining Pass',
    category: 'Restaurant',
    discountLabel: '20% OFF MEALS',
    promoCode: 'FOODIE600',
    validity: 'Valid through 2026',
    terms: 'Demonstration voucher: Redeemable across verified heritage mess locations in Madurai, Karaikudi & Chennai. Local demo coupon.',
    image: MADURAI_IMAGE,
  },
  {
    id: 'off-4',
    title: 'State Intercity AC Cab & Chauffeur Sightseeing',
    category: 'Transport',
    discountLabel: '₹500 CASHBACK',
    promoCode: 'RIDECHOLA',
    validity: 'Valid on weekends',
    terms: 'Demonstration voucher: Applicable on round trips from Chennai to Mahabalipuram or Madurai to Rameswaram. Sample preview.',
    image: HERO_IMAGE,
  },
];
