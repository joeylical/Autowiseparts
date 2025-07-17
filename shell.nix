{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bash
    pkgs.docker
  ];

  shellHook = ''
    echo "Starting ap_run.sh in the background..."
    ./ap_run.sh &
    AP_RUN_PID=$!
    echo "ap_run.sh started with PID: $AP_RUN_PID"

    trap 'echo "Exiting shell, sending SIGINT to ap_run.sh (PID: $AP_RUN_PID)..."; kill -SIGINT $AP_RUN_PID; sleep 1;' EXIT

    echo "Shell is ready. Type 'exit' to stop ap_run.sh and leave."
  '';
}
