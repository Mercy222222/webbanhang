const mammoth = require('mammoth');
const fs = require('fs');

mammoth.extractRawText({path: "Báo cáo cuối.docx"})
    .then(function(result){
        fs.writeFileSync("doc_text.txt", result.value);
        console.log("Text extracted.");
    })
    .catch(function(err){
        console.error(err);
    });
