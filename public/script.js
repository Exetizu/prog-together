
        var socket = io();
        socket.on('connect',()=>{
            socket.emit('new-client-append', {code: ""})
            socket.on("new-client-append",(code)=>{
                console.log("abc");
                editor.getSession().setValue(code.code)
                document.getElementsByTagName("iframe")[0].srcdoc = editor.getSession().getValue()
            })
            console.log("User connected");
            document.getElementById("editor").addEventListener("keyup",()=>{
                socket.emit('codeSend',{
                    code: editor.getSession().getValue()
                })
                document.getElementsByTagName("iframe")[0].srcdoc = editor.getSession().getValue()
            })
        })
        socket.on('disconnect',()=>{
            console.log("User disconnected");
        });
        socket.on("codeReceive",(code)=>{
            editor.getSession().setValue(code.code)
            document.getElementsByTagName("iframe")[0].srcdoc = editor.getSession().getValue()

        })


        //ace config /////////////////////////////////////////////////////////////
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/tomorrow_night");
        editor.session.setMode("ace/mode/html");
        