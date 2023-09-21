/**
 * 本模块与升降装置模型相关
 * 
 */

import * as THREE from "three"
import gsap from "gsap"
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
                // 下落检测时，相对下降幅度 0.8m
                this.liftingDevice000.position.y -= 0.8
                this.scene.add(this.liftingDevice000)
                break
            }
            case "LiftingDevice001": {
                this.liftingDevice001 = this.resources.items.LiftingDevice001.scene.children[0]
                this.liftingDevice001.material = material
                // 相对下降幅度 0.8m
                this.liftingDevice001.position.y -= 0.8
                this.scene.add(this.liftingDevice001)
                break
            }
        }
    }

    cmd(liu, action){
        var obj
        if(liu == '1') obj = this.liftingDevice000
        else obj = this.liftingDevice001
        switch (action) {
            case "上升":

                gsap.timeline().to(obj.position, {
                    y:obj.position.y + 0.8,
                    duration: 5
                })
                //幀動畫
                // obj.position.y += 0.1
                // if(obj.position.y >= 6) return
                // requestAnimationFrame(()=>{
                //     this.cmd(modelName, action) 60
                // })
            break;
            case "下降":
                gsap.timeline().to(obj.position, {
                    y:obj.position.y - 0.8,
                    duration: 5
                })
                // obj.position.y -= 0.1
                // if(obj.position.y <= 5.2) return
                // requestAnimationFrame(()=>{
                //     this.cmd(modelName, action) 200
                // })
            break;
        }
        
    }
}