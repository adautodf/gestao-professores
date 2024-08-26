package unifor.buildrun.service;

import jakarta.enterprise.context.ApplicationScoped;
import unifor.buildrun.entity.ProfessorEntity;
import unifor.buildrun.exception.ProfessorNotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ProfessorService {

    public ProfessorEntity createProfessor(ProfessorEntity professorEntity){
        ProfessorEntity.persist(professorEntity);
        return professorEntity;
    }

    public List<ProfessorEntity> findAll(Integer page, Integer pageSize){
        return ProfessorEntity.findAll()
                .page(page, pageSize)
                .list();
    }

    public ProfessorEntity findById(UUID professorId){
        return (ProfessorEntity) ProfessorEntity.findByIdOptional(professorId)
                .orElseThrow(ProfessorNotFoundException::new);
    }

    public ProfessorEntity updateProfessor(UUID professorId, ProfessorEntity professorEntity) {
        var professor = findById(professorId);

        professor.nome = professorEntity.nome;
        professor.curso = professorEntity.curso;

        ProfessorEntity.persist(professor);

        return professor;
    }

    public void deleteById(UUID professorId) {
        var professor = findById(professorId);

        ProfessorEntity.deleteById(professor.professorId);
    }
}
