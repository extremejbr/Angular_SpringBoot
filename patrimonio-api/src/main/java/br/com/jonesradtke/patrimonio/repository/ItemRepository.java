package br.com.jonesradtke.patrimonio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonesradtke.patrimonio.model.Item;;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
 