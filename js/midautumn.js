/**************获取Cookie函数*************************/
function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
    return "";
}
var openid=getCookie("openid");
var opportunity=getCookie("opportunity");
(function() {
    var pub = {
        init: function() {
            var This = this;
            this.game = document.getElementById("game_con");
            this.$game = $('#game_con');
            this.role = $('#role');
            this.gwidth = this.$game.width();
            this.gheight = this.$game.height();
            this.enemys = [];
            this.enemyslen = 0;
            this.scroe = 0;
            this.mark = 0;
            this.time = null;
            this.clock = null;
            this.clocker = 0;
            this.levelCtrl = 0;
            this.levelBoom = 1;
            this.level = [
                [
                    [8, 13],
                    [15, 3]
                ],
                [
                    [12, 17],
                    [20, 8]
                ],
                [
                    [14, 19],
                    [22, 15]
                ]
            ];
            this.scrName = ["火鸡小贱仁", "火鸡神级黑粉", "火鸡狂魔", "火鸡蛇精病"];
            this.mk = $('#mk_con');
            this.sec = $('#sec_con');
            this.add = $('#add');
            this.meng = $('#meng');
            this.addClock = null;
            this.game_load = $('#gameReady');
            this.loadBtn = $('#loading');
            this.guizeBtn = $('#guize');
            this.gzcloseBtn = $('#close_gz');
            this.beginBtn = $('#btnGamestart');
            //this.over = $('#over_con');
            this.iam = $('#iam_con');
            this.fight = $('#fight_con');
            this.fight2 = $('#fight_con2');
            this.again = $('#again');
            //this.share=$('#share');
            this.share = $('.share');
            /*            $('body').bind({
             "touchmove": function(event) {
             event.stopPropagation();
             event.preventDefault();
             }
             });*/

                document.getElementById("loading").style.display="block";
                var t = setInterval(function() {
                    if (document.readyState == "complete") {
                        document.getElementById("loading").style.display = "none";
                        clearInterval(t);
                    }
                }, 500);

                /*音乐*/
                var musicHandle = $('.m-music');
                var audio = document.getElementById('J_audio');
                var audioFlag = 0;
                musicHandle.on('click', function() {
                    audioFlag = 1;
                    if ($(this).hasClass('m-play')) {
                        audio.pause();
                        $(this).removeClass('m-play');
                        // $.fn.coffee.stop();
                    } else {
                        audio.play();
                        $(this).addClass('m-play');
                        // $.fn.coffee.start();
                    }
                });
                This.gzcloseBtn.bind("touchstart", function() {
                    This.guizeBtn.hide();
                });

            /*开始游戏按钮*/
       $('#btnGamestart').on("touchstart", function() {
           if(Date.now()>1451750400000){//1451750400000
               $("#gameOver").show();
               return
           }
           if(opportunity<=0){
               $("#alertInfo").show();
               $("#btnRestart").hide();
               $("#tipCont3").show();
               return
           }



                This.game_load.hide();
                setTimeout(function() {
                    $('#ctrl').removeClass('tips');
                    This.begin();
                }, 0);
                //  todo:拖动小人 时间
            });
        },
        begin: function() {
            var This = this;
            ctrlTit.init();
            mkTit.init();
            this.time = setInterval(function() {

                var cl = This.clocker++;
                //This.sec.html(cl+'.0"');
                This.sec.html(cl);
                var num = mkTit.mathRandom(1, 10) - 1;
                var className = "mooncake" + num + " crash";
                mkTit.creatFun(className, This.random(This.level[This.levelCtrl][0][0], This.level[This.levelCtrl][0][1]));

                /*炸弹*/
                if (This.mark % This.levelBoom == 0) {
                    /*炸弹的种类*/
                    var boomcount=parseInt(Math.random()*2);
                    if(boomcount==0){
                        var strBoom="boom crash";
                    }else{
                        var strBoom="boom1 crash";
                    }
                    mkTit.creatFun(strBoom, This.random(This.level[This.levelCtrl][1][0], This.level[This.levelCtrl][1][0]));
                    This.mark = 0;
                }
                if (This.clocker > 30) {
                    This.levelBoom = 1;
                    This.levelCtrl = 2;
                } else if (This.clocker > 15) {
                    This.levelBoom = 2;
                    This.levelCtrl = 1;
                } else {
                    This.levelBoom = 2;
                    This.levelCtrl = 0;
                }
                This.mark++;
            }, 1000);
            this.clock = setInterval(function() {
                for (var i = 0; i < This.enemyslen; i++) {
                    var ttt = This.enemys[i];
                    var tt = $(ttt);
                    var speed = parseInt(ttt.speed);
                    var left = parseInt(ttt.left);
                    ttt.top = parseInt(ttt.top) + speed;
                    tt.css('-webkit-transform', "translate(" + left + "px," + ttt.top + "px)");
                    if (ttt.top + 10 > This.gheight && tt.hasClass('crash')) {
                        tt.removeClass('crash');
                        tt.remove();
                        This.enemyslen--;
                        This.enemys.splice(i, 1);
                    } else if (ttt.top + mkTit.height + mkTit.role > This.gheight) {
                        if (mkTit.crash(left) && tt.hasClass('crash')) {
                            if (tt.hasClass('mooncake0')) {
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 500);
                            } else if (tt.hasClass('mooncake1')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 3000);
                            } else if (tt.hasClass('mooncake2')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 300);
                            } else if (tt.hasClass('mooncake3')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake4')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake5')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake6')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake7')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake8')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('mooncake9')) {
                                /*pub.gameOver();*/
                                pub.scroe = pub.scroe + 1;
                                pub.mk.html(pub.scroe);
                                clearInterval(This.addClock);
                                This.add.html("+1").show().css("left", left + 'px').show();
                                //This.add.css("left",left+'px').show();
                                This.addClock = setTimeout(function() {
                                    This.add.hide();
                                }, 200);
                            } else if (tt.hasClass('boom')||tt.hasClass('boom1')||tt.hasClass('boom2')||tt.hasClass('boom3')) {
                                pub.gameOver();
                                //   todo: 游戏结束
                                //提交游戏数据到服务端
                            }
                            This.enemyslen--;
                            This.enemys.splice(i, 1);
                            tt.removeClass('crash');
                            tt.remove();
                        }
                    }
                }
            }, 100);
            //    todo:物体下落  时间
        },
        getTf: function(tar) {
            var reg = /\-?[0-9]+/g;
            return tar.css('-webkit-transform').match(reg);
        },
        gameOver: function() {
            var This = this;
            clearInterval(this.time);
            clearInterval(this.clock);
            this.role.addClass('dead');
            //游戏结束

            var data={
                openid:openid,
                score:$("#mk_con").html()
            };
            $.ajax({
                url: myurl+'/SethOLE/bonus',
                async: false,
                type: "POST",
                data:data,
                dataType: 'json',
                success: function (result) {
                    if(result.num==10000){
                        if(opportunity-1<=0){
                            var i=$("#mk_con").html();
                            $("#tipCont1").html("恭喜你接住了<span id=\"candyNum\">"+i+"</span>个圣诞糖果。")
                            $("#tipCont1").show()
                            $("#tipCont3").html("可是机会已用完，分享好友再次挑战，冲刺大奖吧！")
                            $("#tipCont3").show()
                            $("#btnRestart").hide()
                            $("#alertInfo").show();
                        }else {
                            $("#tipCont1").show()
                            $("#candyNum").html($("#mk_con").html());
                            $("#alertInfo").show();
                        }
                    }
                },
                error:function(err){
                    location.reload(true);
                }
            });

            /*setTimeout(function() {
                This.again.bind({

                    "touchstart": function() {
                        document.getElementById("loading").style.display = "block";
                        var t = setInterval(function() {
                            if (document.readyState == "complete") {
                                document.getElementById("loading").style.display = "none";
                                clearInterval(t);
                            }
                        }, 500);
                        location.reload(true);
                    }
                });
            }, 500);
            //    todo:dead 跳转到结束页*/
        },
        random: function(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        },

    };
    var ctrlTit = {
        init: function() {
            this.role = $('#role');
            this.roleWidth = this.role.width();
            this.moveGo = 0;
            this.addEvent();

        },
        addEvent: function() {

            var This = this;
            This.role.bind({
                "touchstart": function(event) {
                    This.moveFun(event);
                }
            });
            This.role.on("touchmove",function(event){
                This.moveFun(event);
            });
        },
        moveFun: function(event) {
            event.stopPropagation();
            event.preventDefault();
            //if (event.targetTouches.length == 1) {
            if (event.originalEvent.changedTouches.length == 1) {
                var touch = event.originalEvent.changedTouches[0];
                this.moveGo = touch.pageX - this.roleWidth / 2;
                if (this.moveGo >= 0 && this.moveGo <= pub.gwidth - this.roleWidth)
                    this.role.css('-webkit-transform', "translate(" + this.moveGo + "px, 0px)");
            }
        }
    };
    var mkTit = {
        init: function() {
            this.width = 38;
            this.height = 36;
            this.role = 75;
        },
        creatFun: function(className, speed) {
            var This = this;
            var mk = document.createElement("span");
            var $mk = $(mk);
            mk.className = className;
            pub.game.appendChild(mk);
            var left = This.random();
            $mk.css('-webkit-transform', 'translate(' + left + 'px,-' + this.height + 'px)');
            mk.speed = speed;
            mk.left = left;
            mk.top = this.height * -1;
            pub.enemys.push(mk);
            pub.enemyslen++;
        },
        random: function() {
            return Math.ceil(Math.random() * (pub.gwidth - this.width));
        },
        mathRandom: function(n1, n2) {
            return Math.round(Math.random() * (Math.max(n1, n2) - Math.min(n1, n2) + 1), 0); //返回n1到n2之间的数据
        },

        crash: function(left) {
            if (
                (left > ctrlTit.moveGo && left < ctrlTit.moveGo + ctrlTit.roleWidth) || (left + this.width > ctrlTit.moveGo && left + this.width < ctrlTit.moveGo + ctrlTit.roleWidth)
            ) {
                return true;
            }
            return false;
        }
    };
    pub.init();
})()