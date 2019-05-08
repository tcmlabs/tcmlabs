#!/usr/bin/env bash

NIX_VERSION=2.2.2
DOWNLOAD_DIR=bin/tmp

curl -o $DOWNLOAD_DIR/install-nix-$NIX_VERSION https://nixos.org/nix/install
curl -o $DOWNLOAD_DIR/install-nix-$NIX_VERSION.sig https://nixos.org/nix/install.sig
gpg2 --recv-keys B541D55301270E0BCF15CA5D8170B4726D7198DE
gpg2 --verify $DOWNLOAD_DIR/install-nix-$NIX_VERSION.sig
sh $DOWNLOAD_DIR/install-nix-$NIX_VERSION
