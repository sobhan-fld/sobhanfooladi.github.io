document.addEventListener("DOMContentLoaded", function() {
    const terminalInput = document.getElementById("input");
    const terminalOutput = document.getElementById("output");

    // Default terminal output
    function showDefaultOutput() {
        printToTerminal("Welcome to Sobhan's Terminal CV!");
        printToTerminal("Type 'cv --help' to get started.");
    }

    function printToTerminal(message) {
        let index = 0;

        // Add a new line for the message to appear on a separate line
        const line = document.createElement("span");
        terminalOutput.appendChild(line);
        terminalOutput.appendChild(document.createElement("br"));

        function typeCharacter() {
            if (index < message.length) {
                line.textContent += message[index];
                index++;
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Ensure scroll stays at the bottom
                setTimeout(typeCharacter, 10); // Adjust speed here (milliseconds per character)
            }
        }
        typeCharacter();
    }

    function executeCommand(command) {
        const args = command.trim().split(" ");
        const cmd = args[0];
        const params = args.slice(1);

        switch (cmd) {
            case "cv":
                handleCVCommands(params);
                break;
            case "clear":
                terminalOutput.textContent = "";
                showDefaultOutput(); // Reset default output when cleared
                break;
            default:
                printToTerminal(`Command not found: ${cmd}`);
        }
    }

    function handleCVCommands(params) {
        fetch("english.json")
            .then(response => response.json())
            .then(data => {
                if (params[0] === "--help") {
                    printToTerminal(`Available commands:\ncv --help\ncv --language [lang]\ncv --info\ncv --skills\ncv --PS (for professional summery)`);
                } else if (params[0] === "--language") {
                    printToTerminal(`${data.languages}`);
                } else if (params[0] === "--info") {
                    printToTerminal(`${data.fullName}\n${data.title}\nEmail: ${data.contact.email}\nPhone: ${data.contact.phone}`);
                } else if (params[0] === "--skills") {
                    printToTerminal(`${data.skills}`);
                } else if (params[0] === "--PS"){
                    printToTerminal(`${data.objective}`)
                } else if (params[0] === "--ex"){
                    printToTerminal(`${data.skills}`)
                }
                else {
                    printToTerminal("Invalid cv command. Use 'cv --help' for guidance.");
                }
            })
            .catch(error => printToTerminal("Error fetching CV data."));
    }

    // Show default output
    showDefaultOutput();

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const command = terminalInput.value;
            terminalInput.value = "";
            printToTerminal(`> ${command}`);
            executeCommand(command);
        }
    });
});
