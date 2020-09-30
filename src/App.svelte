<script lang="ts">
import MultiPart from "./components/multi-part/MultiPart.svelte";


</script>

<style>
	.wrap {
		width: 600px;
		margin: 0 auto;
		display: grid;
		justify-items: center;;
		
	}

	header {
		height: 80px;
		display: grid;
		place-items: center;
		font-size: 2rem;
	}
</style>

<header>Form State Test</header>
<div class="wrap">
	<MultiPart />
</div>