with import <nixpkgs> { };

runCommand "dummy" {
  buildInputs = [ vscode ];
} ""
