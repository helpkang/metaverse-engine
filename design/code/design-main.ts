type Size = {width:number, height:number};

interface CEngineConfigure {
    size: Size
}

class CEngine {
    constructor(private config: CEngineConfigure) {
    }

    addSene(scene: Scene) {
    }
}



class SceneConfigure{

}


class Scene {
    engine!: CEngine;

    constructor(private configre: SceneConfigure) {
    }

    public init(engine: CEngine ): void {
        this.engine = engine;
    }
}

