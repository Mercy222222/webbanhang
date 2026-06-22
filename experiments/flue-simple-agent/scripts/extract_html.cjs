const mammoth = require('mammoth');
const fs = require('fs');

mammoth.convertToHtml({path: "Báo cáo cuối.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        fs.writeFileSync("doc_content.html", html);
        console.log("Extracted HTML successfully.");
    })
    .catch(function(err){
        console.error(err);
    });
