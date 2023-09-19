import * as THREE from "three"
import Experience from "../Experience"

let material = null

export default class LiftingDevice {
    constructor() {

        this.bindExperience()
        this.setMaterial()
        this.modelList = ["LiftingDevice000", "LiftingDevice001"]
    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    setMaterial() {
        material = new THREE.MeshPhysicalMaterial({
            color: "#EEE8AA"
        })
    }

    loadModel(name) {
        switch (name) {
            case "LiftingDevice000": {
                this.liftingDevice000 = this.resources.items.LiftingDevice000.scene.children[0]
                this.liftingDevice000.material = material
                this.scene.add(this.liftingDevice000)
                break
            }
            case "LiftingDevice001": {
                this.liftingDevice001 = this.resources.items.LiftingDevice001.scene.children[0]
                this.liftingDevice001.material = material
                this.scene.add(this.liftingDevice001)
                break
            }
        }
    }
}