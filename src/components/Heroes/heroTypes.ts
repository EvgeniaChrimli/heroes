export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  attack_type: "Melee" | "Ranged";
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_mana: number;
  base_attack_min: number;
  base_attack_max: number;
  base_armor: number;
}
