import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class FileExport {
    exportFile(data, name) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var contentType = 'application/csv';
        var blob = new Blob([data], {type: contentType});
        var blobUrl = URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
    }
}