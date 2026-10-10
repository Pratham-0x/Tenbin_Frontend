<template>
  <div class="lobby_container">
    <div id="dashboard">
      <div class="panel">
        <span>Lobby</span>
        <span>Rules</span>
        <span>Players: 0</span>
      </div>
      <div id="dashboard_content">
        <h3>Game panel</h3>
      </div>
      <button id="start" disabled>Start Game</button>
    </div>
    <div id="player_list">
      <ul>
        <li><span>Player 1</span> <span>0</span></li>
      </ul>
    </div>
    <div id="notice_board">
      <div id="notice">
        <p>Waiting for players...</p>
      </div>
      <input id="text" type="text" placeholder="Type a message" />
    </div>
  </div>
</template>

<style scoped src="../lobby.css"></style>
