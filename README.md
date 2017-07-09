# simple-sheet
A simple interface methods to read xls, xlsx and csv files, compatible with old navigators like "Interet Explorer 8" and moderns too.

## Prerequisites
###### es-shim.js https://github.com/es-shims/es5-shim
###### moxie.js, moxie.swf https://github.com/moxiecode/moxie 
###### jszip.js https://github.com/Stuk/jszip
###### xlsx.js https://github.com/SheetJS/js-xlsx

## Supported file type
* XLS (application/vnd.ms-excel)
* XLSX (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)
* CSV (text/csv)

## Example
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <script src="es5-shim.min.js"></script>
    <script src="moxie.min.js"></script>
    <script src="o.js"></script>
    <script src="jszip.min.js"></script>
    <script src="xlsx.min.js"></script>
    <script src="simple-sheet.js"></script>
    <script>mOxie.Env.swf_url = "moxieSwf/Moxie.min.swf";</script>
    
    <a id="file-picker" href="javascript:;">Charger un fichier ... </a>
    <span id="result"></span>
    <br/>
    <br/>
    <textarea id="result_" cols="100" rows="25" ></textarea>
    <span id="result1"></span>
    <script>
    
        var fileInput = new mOxie.FileInput({
            browse_button: 'file-picker', // or document.getElementById('file-picker')
            accept: [
                {title: "Excel", extensions: "csv,xls,xlsx"}
            ]
        });
    
        fileInput.onchange = function (e) {
            //console.info(e.target.files); // or this.files or fileInput.files
            var file = e.target.files[0];
    
            SM_SHEET.toJsonContent(file, document.getElementById("result_"), {dateNF:"DD-MM-YYYY"});
            SM_SHEET.toHtmlContent(file, document.getElementById("result1"), {dateNF:"DD-MM-YYYY"});
    
        };
    
        fileInput.init(); // initialize
    </script>
    
    </body>
    </html>
