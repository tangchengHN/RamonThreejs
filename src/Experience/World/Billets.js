import * as THREE from "three"
import gsap from "gsap"
import Experience from "../Experience"

var cutLength = 10;
var isCut1 = false;
var isCut2 = false;
var speed = 20 / 60;
var defaultPos = -9.5;
export default class Billets {
    constructor() {

        this.bindExperience()
        this.setMesh()

        this.tl1 = gsap.timeline()
        this.tl1.to(this.mesh.position, {
            x: this.mesh.position.x + speed * 60,
            onUpdate: ()=>{
                if(isCut1) {
                    isCut1 = false;
                    var x = this.mesh.position.x - defaultPos//移动的位置
                    this.cutMesh = this.mesh.clone();
                    console.log(x + "  |  " + this.mesh.position.x);
                    this.cutMesh.geometry = new THREE.CylinderGeometry(0.3, 0.3, x)
                    this.cutMesh.material = new THREE.MeshBasicMaterial({ color: "#00ff00" })
                    this.cutMesh.position.x = 15 + defaultPos + x/2
                    this.scene.add(this.cutMesh);
                    this.tl1.time(0)
                    
                    gsap.timeline().to(this.cutMesh.position, {
                        x : this.cutMesh.position.x+ speed * 60,
                        duration: 40
                    })
                }
            },
            duration: 60
        }).repeat(-1)

        this.tl2 = gsap.timeline()
        this.tl2.to(this.mesh2.position, {

            x: this.mesh2.position.x + 10,
            onUpdate: {
                if(isCut2) {

                    

                }
            },
            duration: 60
        }).kill();
    }


    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
    }

    setMesh() {
        // 半径 0.3m，长 6m
        this.geometry = new THREE.CylinderGeometry(0.3, 0.3, 30)
        this.material = new THREE.MeshPhysicalMaterial({
            color: "#FF0000"
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // 相对位置，4.5m是高度，6.4m是钢坯横向偏移
        // 钢坯半径每大 0.1m，高度应该响应增加 0.1m，否则会穿模
        this.mesh.position.set(defaultPos, 4.5, 6.4)
        this.mesh.rotateZ(Math.PI / 2)

        this.scene.add(this.mesh)

        this.mesh2 = this.mesh.clone()
        this.mesh2.position.set(-20, 4.5, 8.7)
        this.scene.add(this.mesh2)
    }

    cmd(liu, action) {
        var tl = (liu == "1" ? this.tl1 : this.tl2)
        var obj = (liu == "1" ? this.mesh : this.mesh2)
        switch (action) {
            case "移动":
                tl.restart()
                break;
            case "暂停":
                tl.pause()
                break;
            case "复位":
                tl.time(0)
                tl.kill();
                break;
            case "一切位置切割":
                isCut1 = true;
                break;
        }
    }
}