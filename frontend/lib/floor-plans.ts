export type RoomType =
  | "living"
  | "kitchen"
  | "dining"
  | "bedroom"
  | "terrace"
  | "garden"
  | "hall";

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  /** Posição e tamanho em células (1 célula ≈ 2 m × 2 m na planta base). */
  x: number;
  y: number;
  w: number;
  d: number;
  note: string;
};

export type FloorPlan = {
  id: "cobertura" | "garden" | "sky";
  label: string;
  /** Área privativa total em m². As áreas por cômodo são proporcionais. */
  area: number;
  cols: number;
  rows: number;
  rooms: Room[];
};

export const floorPlans: FloorPlan[] = [
  {
    id: "cobertura",
    label: "Penthouse Duplex",
    area: 680,
    cols: 17,
    rows: 10,
    rooms: [
      { id: "living", name: "Living duplo", type: "living", x: 0, y: 0, w: 7, d: 6, note: "Pé-direito duplo e vista para a cidade." },
      { id: "cozinha", name: "Cozinha gourmet", type: "kitchen", x: 0, y: 6, w: 4, d: 4, note: "Ilha central e despensa integrada." },
      { id: "jantar", name: "Sala de jantar", type: "dining", x: 4, y: 6, w: 3, d: 4, note: "Mesa para doze lugares." },
      { id: "terraco", name: "Terraço com piscina", type: "terrace", x: 7, y: 0, w: 6, d: 4, note: "Piscina privativa com borda infinita." },
      { id: "master", name: "Suíte master", type: "bedroom", x: 7, y: 4, w: 5, d: 6, note: "Closet duplo e banheira com vista." },
      { id: "suite2", name: "Suíte 2", type: "bedroom", x: 13, y: 0, w: 2, d: 4, note: "Closet e banheiro privativos." },
      { id: "suite3", name: "Suíte 3", type: "bedroom", x: 15, y: 0, w: 2, d: 4, note: "Closet e banheiro privativos." },
      { id: "suite4", name: "Suíte 4", type: "bedroom", x: 12, y: 4, w: 5, d: 3, note: "Varanda voltada para o nascente." },
      { id: "suite5", name: "Suíte 5", type: "bedroom", x: 12, y: 7, w: 5, d: 3, note: "Pode virar escritório." },
    ],
  },
  {
    id: "garden",
    label: "Garden Suites",
    area: 580,
    cols: 15,
    rows: 10,
    rooms: [
      { id: "jardim", name: "Jardim privativo", type: "garden", x: 0, y: 0, w: 5, d: 4, note: "Terraço arborizado com deck." },
      { id: "cozinha", name: "Cozinha", type: "kitchen", x: 5, y: 0, w: 4, d: 4, note: "Integrada ao jardim." },
      { id: "suite1", name: "Suíte 1", type: "bedroom", x: 9, y: 0, w: 6, d: 4, note: "Closet e banheiro privativos." },
      { id: "living", name: "Living integrado", type: "living", x: 0, y: 4, w: 7, d: 6, note: "Abre para o jardim em todo o vão." },
      { id: "suite2", name: "Suíte 2", type: "bedroom", x: 7, y: 4, w: 4, d: 3, note: "Closet e banheiro privativos." },
      { id: "suite3", name: "Suíte 3", type: "bedroom", x: 11, y: 4, w: 4, d: 3, note: "Closet e banheiro privativos." },
      { id: "master", name: "Suíte master", type: "bedroom", x: 7, y: 7, w: 8, d: 3, note: "Closet amplo e banheiro com banheira." },
    ],
  },
  {
    id: "sky",
    label: "Sky Residences",
    area: 520,
    cols: 13,
    rows: 10,
    rooms: [
      { id: "hall", name: "Hall e elevador", type: "hall", x: 0, y: 0, w: 3, d: 4, note: "Elevador privativo abre direto na unidade." },
      { id: "living", name: "Living", type: "living", x: 3, y: 0, w: 6, d: 5, note: "Janelas do piso ao teto." },
      { id: "varanda", name: "Varanda", type: "terrace", x: 9, y: 0, w: 4, d: 2, note: "Vista panorâmica." },
      { id: "suite3", name: "Suíte 3", type: "bedroom", x: 9, y: 2, w: 4, d: 3, note: "Closet e banheiro privativos." },
      { id: "cozinha", name: "Cozinha", type: "kitchen", x: 0, y: 4, w: 3, d: 3, note: "Integrada ao jantar." },
      { id: "suite4", name: "Suíte 4", type: "bedroom", x: 0, y: 7, w: 3, d: 3, note: "Closet e banheiro privativos." },
      { id: "jantar", name: "Sala de jantar", type: "dining", x: 3, y: 5, w: 4, d: 5, note: "Mesa para dez lugares." },
      { id: "suite1", name: "Suíte master", type: "bedroom", x: 7, y: 5, w: 3, d: 5, note: "Closet e banheiro com vista." },
      { id: "suite2", name: "Suíte 2", type: "bedroom", x: 10, y: 5, w: 3, d: 5, note: "Closet e banheiro privativos." },
    ],
  },
];

export const cellsOf = (room: Room) => room.w * room.d;
export const totalCells = (plan: FloorPlan) =>
  plan.rooms.reduce((sum, room) => sum + cellsOf(room), 0);
export const roomArea = (plan: FloorPlan, room: Room) =>
  Math.round((cellsOf(room) / totalCells(plan)) * plan.area);
