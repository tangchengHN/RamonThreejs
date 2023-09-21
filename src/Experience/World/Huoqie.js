/**
 * 本模块与 火切机模型 相关
 */

import * as THREE from "three"
import Experience from "../Experience"
import gsap from "gsap"

let material = null
// var speed = 3.2 / 5;
var speed = 20 / 60;
export default class Huoqie {
    constructor() {
        this.bindExperience()

        this.modelList = ["Huoqie000", "Huoqie001", "Huoqie010", "Huoqie011"]

        // 模型集合，用于存放四个火切机
        this.models = {}
        this.setMaterial()
        this.loadModel(name)


    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    // 共用材质
    setMaterial() {
        if (!material) {
            material = new THREE.MeshPhysicalMaterial({
                color: "#FFFFFF"
            })
        }
        this.material = material
    }

    // 设置 Mesh
    loadModel(name) {

        switch (name) {
            // 第一流一切
            case "Huoqie000": {
                this.models["Huoqie000"] = this.resources.items.Huoqie000.scene.children[0]
                this.scene.add(this.models["Huoqie000"])
                
                this.tl1 = gsap.timeline()
                this.tl1.to(this.models["Huoqie000"].position, {
                    x: this.models["Huoqie000"].position.x + speed * 9.5,
                    onComplete: () => {
                        this.tl1.reverse(0)
                        this.experience.world.models["Billets"].cmd("1", "一切位置切割");
                    },
                    duration: 9.5
                }).kill()

                break;
            }
            // 第一流二切
            case "Huoqie001": {
                this.models["Huoqie001"] = this.resources.items.Huoqie001.scene.children[0]
                this.scene.add(this.models["Huoqie001"])
                break;
            }
            // 第二流一切
            case "Huoqie010": {
                this.models["Huoqie010"] = this.resources.items.Huoqie010.scene.children[0]
                this.scene.add(this.models["Huoqie010"])
                break
            }
            // 第二流二切
            case "Huoqie011": {
                this.models["Huoqie011"] = this.resources.items.Huoqie011.scene.children[0]
                this.scene.add(this.models["Huoqie011"])
                break
            }
        }
    }


    cmd(liu, action) {
        switch (action) {
            case "一切位置切割":
                var tl = (liu == "1" ? this.tl1 : this.tl1)
                var obj = (liu == "1" ? this.models["Huoqie000"] : this.models["Huoqie010"])
                tl.restart();
                break;
            case "二切位置切割":

                break;
            case "复位":
                break;

        }
    }
}