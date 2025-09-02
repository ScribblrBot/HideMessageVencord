/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { findByPropsLazy } from "@webpack";
import { sendBotMessage } from "@api/Commands";
import { CommandContext } from "@vencord/discord-types";

const messageInputSelector = '[aria-label="Message #channel-name"]';  // Select the input area for messages

export default definePlugin({
  name: "Text Formatter",
  description: "Automatically formats <TEXT to ||TEXT||",
  authors: ["YourName"],
  commands: [],
});

function monitorMessageInput() {
  const messageInput = document.querySelector(messageInputSelector) as HTMLTextAreaElement;
  
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      let currentText = messageInput.value;
      
      // Check if the text starts with < and ends with }
      if (currentText.startsWith('<') && currentText.endsWith('}')) {
        const transformedText = `||${currentText.slice(1, -1)}||`;  // Wrap text with ||
        messageInput.value = transformedText;  // Update the message input with the new formatted text
      }
    });
  }
}

// Run the function when the page loads to monitor the input area
document.addEventListener("DOMContentLoaded", monitorMessageInput);
