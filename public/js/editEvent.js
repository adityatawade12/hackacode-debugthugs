var id=window.location.pathname
console.log(id.split("/"))
$("#imgSave").on("click",function () {
    console.log("dede")
    var fd= new FormData();
    var file=$("#zz")[0].files[0]
    fd.append("image",file)
    fd.append("id",id.split("/")[3])
    console.log(fd.get("image"))
    $.ajax({url: "/NGO/addImage",type:"put",data:fd,  contentType: false,
    processData: false, success: function(result){
        console.log(result.eventImage)
        var x=""
        result.eventImage.forEach(i=>{
            x+=`
            <tr id="${i.link}">
            <td>
              ${i.name}
            </td>
            <td class="text-center preview"> 
             <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="https://img.icons8.com/ios/30/4a90e2/file-preview.png"/></a> 
            </td>
          
            <td id="hihi" class="text-right delete">
              <img src="https://img.icons8.com/material-rounded/24/fa314a/trash.png"/>
            </td>
          </tr>`
          $("tbody").html(x)
        })
        
      }});
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#zz").change(function(){
    readURL(this);
});

$('#removeBtn').on('click', function() {     
    location.reload();
 });

$("tbody").on("click",".delete",function () {
    console.log($(this).parent().attr("id"))
    var fd= new FormData();
    fd.append("link",$(this).parent().attr("id"))
    fd.append("id",id.split("/")[3])
    $.ajax({url: "/NGO/removeImage",type:"post",data:fd,  contentType: false,
    processData: false, success: function(result){
        console.log(result.eventImage)
        var x=""
        if(result.eventImage.length==0){
            location.reload();
        }
        result.eventImage.forEach(i=>{
            x+=`
            <tr id="${i.link}">
            <td>
              ${i.name}
            </td>
            <td class="text-center preview" > 
             <a href="javascript:void(0)"  data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="https://img.icons8.com/ios/30/4a90e2/file-preview.png"/></a> 
            </td>
          
            <td id="hihi" class="text-right delete">
              <img src="https://img.icons8.com/material-rounded/24/fa314a/trash.png"/>
            </td>
          </tr>`
          $("tbody").html(x)
        })
        
      },
      error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        console.log(error)
    }
    
    });
})

$("tbody").on("click",".preview",function () {
    console.log($(this).parent().attr("id"))
    $('#modalImg').attr('src', $(this).parent().attr("id"));
})