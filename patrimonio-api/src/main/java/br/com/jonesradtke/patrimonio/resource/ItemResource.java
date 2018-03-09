package br.com.jonesradtke.patrimonio.resource;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sun.mail.handlers.message_rfc822;

import br.com.jonesradtke.patrimonio.model.Item;
import br.com.jonesradtke.patrimonio.repository.ItemRepository;

@RestController
@CrossOrigin("${origem-permitida}") //Notação para permissão de requisição de uma determinada origem. Arquivo "src/main/resources/aplication.properties".
public class ItemResource {
	
	@Autowired
	private ItemRepository itemRepository;
	
	@GetMapping("/itens")
	public List<Item> listar(){
		return itemRepository.findAll();
	}
	
	@GetMapping("/itens/{id}")
	public List<Item> buscar(@PathVariable Long id){
		Item itemBuscado = itemRepository.findOne(id);
		List<Item> itens = new ArrayList();
		itens.add(itemBuscado);
		return itens;
	}
	
	@PostMapping("/itens")
	public Item adicinar(@RequestBody @Valid Item item){
		return itemRepository.save(item);
	}
	
	@PutMapping("/itens/{id}")
	public ResponseEntity editar(@PathVariable Long id, @RequestBody @Valid Item item){
		Item itemBuscado = itemRepository.findOne(id);
		if(itemBuscado == null) {
	        return new ResponseEntity(id, HttpStatus.NOT_FOUND);
	    }
		itemBuscado.setEtiqueta(item.getEtiqueta());
		itemBuscado.setDescricao(item.getDescricao());
		itemBuscado.setDataAquisicao(item.getDataAquisicao());
		itemRepository.save(itemBuscado);
		return new ResponseEntity(itemBuscado, HttpStatus.OK);
	}
	
	@DeleteMapping("/itens/{id}")
	public ResponseEntity excluir(@PathVariable Long id) {
		itemRepository.delete(id);
		//return ResponseEntity.ok().body("Item excluído com sucesso.");
		return new ResponseEntity(id, HttpStatus.OK);
	}
}
