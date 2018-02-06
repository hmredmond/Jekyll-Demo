#!/bin/bash

which -s brew # Homebrew
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nInstalling Homebrew, a Mac terminal package manager...\n"
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    echo "export PATH='/usr/local/bin:$PATH'" >> ~/.bash_profile
else
    echo -e "\nOkay, looks like you've got Homebrew installed."
fi

which -s ruby # Ruby
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nInstalling Ruby by running 'brew install ruby' ...\n"
    brew install ruby
    gem update --system
else
    echo -e "Okay, looks like you've got Ruby installed."
fi

which -s gm # GraphicsMagick
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nInstalling GraphicsMagick by running 'brew install gm' ...\n"
    brew install graphicsmagick
else
    echo -e "Okay, looks like you've got GraphicsMagick installed."
fi

which -s convert # ImageMagick
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nInstalling ImageMagick by running 'brew install imagemagick' ...\n"
    brew install imagemagick
else
    echo -e "Okay, looks like you've got ImageMagick installed."
fi

which -s jekyll # Jekyll
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nRunning 'gem install jekyll' ...\n"
    gem install jekyll
else
    echo -e "Okay, looks like you've got Jekyll installed."
fi


which -s sass # Sass
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "Running 'gem install sass' ...\n"
    gem install sass
else
    echo -e "Okay, looks like you've got Sass installed."
fi


which -s node # Node.js
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "\nInstalling Node by running 'brew install node' ...\n"
    brew install node
else
    echo -e "Okay, looks like you've got Node installed."
fi


which -s grunt # Grunt package manager
if [[ $? != 0 ]] ; then
    echo -e "\n\n------------------------------------------"
    echo -e "Installing Grunt by running 'npm install -g grunt-cli' ...\n"
    npm install -g grunt-cli
else
    echo -e "Okay, looks like you've got Grunt installed."
fi

echo -e "\n\n------------------------------------------"
echo -e "Installing npm dependencies specified in package.json by running 'npm install' ...\n"
npm install

echo -e "\nAll dependencies installed!\n\nCheck the README to see how to run the Jekyll server,"
echo -e "and how to manage your assets with Grunt. Enjoy :)\n"
