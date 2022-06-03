export interface CollisionSize {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GetCollisionSize {
  getCollisionSize(): CollisionSize;
}

export interface CollisionChecker {
  isCollision(source: CollisionSize, target: CollisionSize): boolean;
}
