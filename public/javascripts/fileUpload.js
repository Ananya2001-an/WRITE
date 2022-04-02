FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginPdfPreview,
    FilePondPluginFileEncode
    );

FilePond.setOptions({
    pdfPreviewHeight: 220
});

FilePond.parse(document.body)