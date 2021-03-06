/*!
 * @author : BOUABDALLAOUI Mohammed
 * Juin 2017
 */

var SM_SHEET = {};

(function make_axe_moxie_sheet(AXE_MOXIE_SHEET) {

    var csv_regex = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;

    /**
     * 
     * @param {*} file 
     * @param {*} widget 
     * @param {*} options 
     */
    var toJsonContent = function (file, widget, options) {

        //console.log(file.name, file.type, file.size);

        if (file.size >= 3145728) return alert('Le fichier est supérieur à 3 Mo');

        var html = document.getElementById("result");

        readFile(file, function (e) {
            var data = e.target.result;
            //xls, xlsx
            if (file.type === "application/vnd.ms-excel"
                || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {

                var content = JSON.stringify(readXlsxToJson(data, options));
                widget.value = content;
                //html.innerHTML = content;
            } else if (file.type === "text/csv") {//CSV avec validation du contenue
                if (!csv_regex.test(data)) {
                    alert("Type de fichier non valide");
                } else {
                    var content = JSON.stringify(readXlsxToJson(data, options));
                    widget.value = content;
                    //html.innerHTML = content;
                }
            } else {
                alert("Type de fichier non valide");
            }
        });
    };

    /**
     * 
     * @param {*} file 
     * @param {*} widget 
     * @param {*} options 
     */
    var toHtmlContent = function (file, widget, options) {

        //console.log(file.name, file.type, file.size);

        if (file.size >= 3145728) return alert('Le fichier est supérieur à 3 Mo');

        var html = document.getElementById("result");

        readFile(file, function (e) {
            var data = e.target.result;
            //xls, xlsx
            if (file.type === "application/vnd.ms-excel"
                || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {

                var content = JSON.stringify(readXlsxToHtml(data, options));
                //widget.value = content;
                html.innerHTML = content;
            } else if (file.type === "text/csv") {//CSV avec validation du contenue
                if (!csv_regex.test(data)) {
                    alert("Type de fichier non valide");
                } else {
                    var content = JSON.stringify(readXlsxToHtml(data, options));
                    //widget.value = content;
                    html.innerHTML = content;
                }
            } else {
                alert("Type de fichier non valide");
            }
        });
    };

    /**
     * readFile : Lecture du contenue en binaire via FileReader (polyfill moxie sur la base du flash)
     * @param {File} file : variable file de l'input
     * @param {Callback} onLoadCallback : fonction de retour Callback
     */
    function readFile(file, onLoadCallback) {
        var reader = new mOxie.FileReader()
        reader.onload = onLoadCallback;
        reader.readAsBinaryString(file);
    }

    /**
     * readXlsxToJson : Utilise la librairie xlsx.js pour parser le contenue et le renvoie en json
     * @param {String} data : Contenue en binaire
     */
    var readXlsxToJson = function (data, options) {
        var workbook = XLSX.read(data, {type: 'binary', cellDates:true});
        if (workbook !== null) {
            var sheetName = workbook.SheetNames[0];
            var contentObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], options);
            return contentObj !== null ? contentObj : "";
        }
    }

    var readXlsxToHtml = function (data, options) {
        var workbook = XLSX.read(data, {type: 'binary', cellDates:true});
        if (workbook !== null) {
            var sheetName = workbook.SheetNames[0];
            var contentObj = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName], options);
            return contentObj !== null ? contentObj : "";
        }
    }

    /**
     * Prototype endsWith
     */
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    SM_SHEET.toJsonContent = toJsonContent;
    SM_SHEET.toHtmlContent = toHtmlContent;
})(typeof exports !== 'undefined' ? exports : SM_SHEET);
