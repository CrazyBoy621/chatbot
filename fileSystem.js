import { renderUI } from "./updateUI.js";
export let messagesData = [];

export async function importData() {
    try {
        // Show the file picker dialog
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "JSON Document",
                    accept: {
                        "application/json": [".json"],
                    },
                },
            ],
        });

        // Get the file contents
        const file = await fileHandle.getFile();
        const content = await file.text();

        // Parse the JSON data
        const jsonData = JSON.parse(content);
        messagesData = jsonData;
        renderUI(messagesData);

        console.log("File selected:", fileHandle.name);
    } catch (error) {
        console.error("Error while importing data:", error);
    }
}

export function exportData() {
    try {
        // Convert the messagesData array to a JSON string
        const jsonData = JSON.stringify(messagesData, null, 2);

        // Create a Blob with the JSON data
        const blob = new Blob([jsonData], { type: "application/json" });

        // Check if the browser supports the "navigator.msSaveOrOpenBlob" method (for Internet Explorer)
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, "exported_data.json");
        } else {
            // Create a temporary anchor element
            const a = document.createElement("a");
            a.style.display = "none";

            // Set the anchor's attributes
            a.href = URL.createObjectURL(blob);
            a.download = "exported_data.json";

            // Append the anchor to the body and click it to trigger the download
            document.body.appendChild(a);
            a.click();

            // Remove the temporary anchor from the body
            document.body.removeChild(a);
        }

        console.log("Export successful!");
    } catch (error) {
        console.error("Error while exporting data:", error);
    }
}
