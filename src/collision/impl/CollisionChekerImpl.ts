import { CollisionChecker, CollisionSize } from "../Collision";

export class CollisionCheckerTmpImpl implements CollisionChecker {
  isCollision(source: CollisionSize, target: CollisionSize): boolean{
    return (source.x < target.x + target.w &&
      source.x + source.w > target.x &&
      source.y < target.y + target.h &&
      source.h + source.y > target.y)
  }
}