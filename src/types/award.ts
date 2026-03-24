export type AwardPrize = {
  value: string;
  note: string;
};

export type AwardCategoryDetail = {
  id: string;
  name: string;
  menuLabel: string;
  slug: string;
  description: string;
  quantity: number;
  unit: "Cá nhân" | "Tập thể" | "Đơn vị";
  prizes: AwardPrize[];
  image: string;
  order: number;
};
